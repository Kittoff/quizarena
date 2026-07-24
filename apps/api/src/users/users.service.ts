import { Injectable } from '@nestjs/common';
import { prisma } from '@quiz-arena/database';

@Injectable()
export class UsersService {
  findByUsername(username: string) {
    return prisma.user.findUnique({ where: { username } });
  }

  findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  create(username: string, hashedPassword: string) {
    return prisma.user.create({
      data: { username, password: hashedPassword },
    });
  }

  async recordResult(userId: string, xpGained: number, won: boolean | null) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        xp: { increment: xpGained },
        wins: won === true ? { increment: 1 } : undefined,
        losses: won === false ? { increment: 1 } : undefined,
      },
    });
  }
}
