import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import type { Server } from 'socket.io';
import { prisma } from '@quiz-arena/database';
import {
  QuestionWithRelations,
  QuestionsService,
} from '../questions/questions.service';
import { UsersService } from '../users/users.service';

const QUESTIONS_PER_DUEL = 5;
const DEFAULT_LANGUAGE = 'fr';

export interface QueuedPlayer {
  socketId: string;
  userId: string;
  username: string;
  language: string;
}

interface DuelPlayer {
  userId: string;
  username: string;
  socketId: string;
  language: string;
  score: number;
}

interface DuelSession {
  id: string;
  questions: QuestionWithRelations[];
  currentIndex: number;
  answeredUserIds: Set<string>;
  players: [DuelPlayer, DuelPlayer];
}

@Injectable()
export class DuelService {
  private readonly logger = new Logger(DuelService.name);
  private server?: Server;
  private queue: QueuedPlayer[] = [];
  private readonly sessions = new Map<string, DuelSession>();
  private readonly socketToSession = new Map<string, string>();

  constructor(
    private readonly questionsService: QuestionsService,
    private readonly usersService: UsersService,
  ) {}

  attachServer(server: Server) {
    this.server = server;
  }

  async join(player: QueuedPlayer): Promise<{ status: 'queued' | 'matched' }> {
    this.queue = this.queue.filter((p) => p.userId !== player.userId);

    const opponent = this.queue.shift();
    if (!opponent) {
      this.queue.push(player);
      return { status: 'queued' };
    }

    await this.startDuel(opponent, player);
    return { status: 'matched' };
  }

  leaveQueue(socketId: string) {
    this.queue = this.queue.filter((p) => p.socketId !== socketId);
  }

  handleDisconnect(socketId: string) {
    this.leaveQueue(socketId);

    const sessionId = this.socketToSession.get(socketId);
    if (!sessionId) return;

    const session = this.sessions.get(sessionId);
    if (!session) return;

    const leaver = session.players.find((p) => p.socketId === socketId);
    const opponent = session.players.find((p) => p.socketId !== socketId);
    if (!leaver || !opponent) return;

    this.server?.to(opponent.socketId).emit('duel:end', {
      result: 'win',
      reason: 'opponent-left',
      scores: { me: opponent.score, opponent: leaver.score },
    });

    this.persistResult(session.id, opponent, leaver, opponent.userId).catch(
      (error: unknown) =>
        this.logger.error('Failed to persist forfeit result', error),
    );

    this.cleanupSession(session);
  }

  async submitAnswer(
    socketId: string,
    payload: { gameId: string; questionIndex: number; answerId: number },
  ) {
    const session = this.sessions.get(payload.gameId);
    if (!session || !this.server) return;
    if (payload.questionIndex !== session.currentIndex) return;

    const player = session.players.find((p) => p.socketId === socketId);
    if (!player || session.answeredUserIds.has(player.userId)) return;

    const question = session.questions[session.currentIndex];
    const result = await this.questionsService.checkAnswer(
      question.id,
      payload.answerId,
    );

    if (result.correct) player.score += 1;
    session.answeredUserIds.add(player.userId);

    if (session.answeredUserIds.size < session.players.length) {
      this.server.to(socketId).emit('duel:waiting-opponent');
      return;
    }

    for (const p of session.players) {
      const opponent = session.players.find((o) => o.userId !== p.userId)!;
      this.server.to(p.socketId).emit('duel:round-result', {
        correctAnswerId: result.correctAnswerId,
        scores: { me: p.score, opponent: opponent.score },
      });
    }

    session.answeredUserIds.clear();
    const nextIndex = session.currentIndex + 1;

    if (nextIndex >= session.questions.length) {
      await this.finishSession(session);
      return;
    }

    session.currentIndex = nextIndex;
    this.emitQuestion(session, nextIndex);
  }

  private async startDuel(a: QueuedPlayer, b: QueuedPlayer) {
    const questions =
      await this.questionsService.findRandomRaw(QUESTIONS_PER_DUEL);
    const gameId = randomUUID();

    await prisma.game.create({
      data: {
        id: gameId,
        mode: 'DUEL',
        players: {
          create: [{ userId: a.userId }, { userId: b.userId }],
        },
      },
    });

    const players: [DuelPlayer, DuelPlayer] = [
      {
        userId: a.userId,
        username: a.username,
        socketId: a.socketId,
        language: a.language || DEFAULT_LANGUAGE,
        score: 0,
      },
      {
        userId: b.userId,
        username: b.username,
        socketId: b.socketId,
        language: b.language || DEFAULT_LANGUAGE,
        score: 0,
      },
    ];

    const session: DuelSession = {
      id: gameId,
      questions,
      currentIndex: 0,
      answeredUserIds: new Set(),
      players,
    };

    this.sessions.set(session.id, session);
    this.socketToSession.set(a.socketId, session.id);
    this.socketToSession.set(b.socketId, session.id);

    this.emitQuestion(session, 0);
  }

  private emitQuestion(session: DuelSession, index: number) {
    if (!this.server) return;
    const rawQuestion = session.questions[index];

    for (const player of session.players) {
      const opponent = session.players.find((p) => p.userId !== player.userId)!;
      this.server.to(player.socketId).emit('duel:question', {
        gameId: session.id,
        questionIndex: index,
        total: session.questions.length,
        question: this.questionsService.project(rawQuestion, player.language),
        scores: { me: player.score, opponent: opponent.score },
        opponent: { username: opponent.username },
      });
    }
  }

  private async finishSession(session: DuelSession) {
    const [p1, p2] = session.players;
    const winnerId =
      p1.score === p2.score
        ? null
        : p1.score > p2.score
          ? p1.userId
          : p2.userId;

    await Promise.all([
      this.persistResult(session.id, p1, p2, winnerId),
      this.persistResult(session.id, p2, p1, winnerId),
    ]).catch((error: unknown) =>
      this.logger.error('Failed to persist duel result', error),
    );

    if (this.server) {
      for (const p of session.players) {
        const opponent = session.players.find((o) => o.userId !== p.userId)!;
        this.server.to(p.socketId).emit('duel:end', {
          result:
            winnerId === null ? 'draw' : winnerId === p.userId ? 'win' : 'loss',
          scores: { me: p.score, opponent: opponent.score },
        });
      }
    }

    this.cleanupSession(session);
  }

  private async persistResult(
    gameId: string,
    player: DuelPlayer,
    opponent: DuelPlayer,
    winnerId: string | null,
  ) {
    await prisma.gamePlayer.updateMany({
      where: { gameId, userId: player.userId },
      data: { score: player.score },
    });

    const won = winnerId === null ? null : winnerId === player.userId;
    await this.usersService.recordResult(player.userId, player.score * 10, won);
  }

  private cleanupSession(session: DuelSession) {
    this.sessions.delete(session.id);
    for (const player of session.players) {
      this.socketToSession.delete(player.socketId);
    }
  }
}
