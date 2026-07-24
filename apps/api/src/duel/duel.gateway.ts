import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import type { Server, Socket } from 'socket.io';
import type { JwtPayload } from '../auth/jwt.strategy';
import { JWT_SECRET } from '../auth/jwt.constants';
import { DuelService } from './duel.service';

interface DuelSocketData {
  userId?: string;
  username?: string;
}

type DuelSocket = Omit<Socket, 'data'> & { data: DuelSocketData };

@WebSocketGateway({
  namespace: 'duel',
  cors: { origin: process.env.WEB_ORIGIN ?? 'http://localhost:3000' },
})
export class DuelGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server!: Server;

  constructor(
    private readonly duelService: DuelService,
    private readonly jwtService: JwtService,
  ) {}

  afterInit(server: Server) {
    this.duelService.attachServer(server);
  }

  handleConnection(client: DuelSocket) {
    const token = client.handshake.auth?.token as string | undefined;

    if (!token) {
      client.disconnect(true);
      return;
    }

    try {
      const payload = this.jwtService.verify<JwtPayload>(token, {
        secret: JWT_SECRET,
      });
      client.data.userId = payload.sub;
      client.data.username = payload.username;
    } catch {
      client.disconnect(true);
    }
  }

  handleDisconnect(client: Socket) {
    this.duelService.handleDisconnect(client.id);
  }

  @SubscribeMessage('duel:join')
  async handleJoin(
    @ConnectedSocket() client: DuelSocket,
    @MessageBody() payload: { language?: string },
  ) {
    const { userId, username } = client.data;

    if (!userId || !username) {
      client.disconnect(true);
      return;
    }

    const result = await this.duelService.join({
      socketId: client.id,
      userId,
      username,
      language: payload?.language ?? 'fr',
    });

    if (result.status === 'queued') {
      client.emit('duel:queued');
    }
  }

  @SubscribeMessage('duel:leave')
  handleLeave(@ConnectedSocket() client: Socket) {
    this.duelService.leaveQueue(client.id);
  }

  @SubscribeMessage('duel:answer')
  async handleAnswer(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    payload: { gameId: string; questionIndex: number; answerId: number },
  ) {
    await this.duelService.submitAnswer(client.id, payload);
  }
}
