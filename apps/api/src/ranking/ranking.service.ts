import { Injectable } from '@nestjs/common';
import { prisma } from '@quiz-arena/database';

export interface RankingEntry {
  rank: number;
  id: string;
  username: string;
  xp: number;
  level: number;
  wins: number;
  losses: number;
}

const DEFAULT_LIMIT = 20;

@Injectable()
export class RankingService {
  async getTopPlayers(limit: number = DEFAULT_LIMIT): Promise<RankingEntry[]> {
    const users = await prisma.user.findMany({
      orderBy: { xp: 'desc' },
      take: limit,
      select: {
        id: true,
        username: true,
        xp: true,
        level: true,
        wins: true,
        losses: true,
      },
    });

    return users.map((user, index) => ({ rank: index + 1, ...user }));
  }

  async getUserRank(userId: string): Promise<number | null> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return null;

    const higherCount = await prisma.user.count({
      where: { xp: { gt: user.xp } },
    });

    return higherCount + 1;
  }
}
