import { Injectable } from '@nestjs/common';
import { prisma } from '@quiz-arena/database';

const XP_PER_LEVEL = 100;

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
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return null;

    const xp = user.xp + xpGained;
    const level = Math.floor(xp / XP_PER_LEVEL) + 1;

    return prisma.user.update({
      where: { id: userId },
      data: {
        xp,
        level,
        wins: won === true ? user.wins + 1 : user.wins,
        losses: won === false ? user.losses + 1 : user.losses,
      },
    });
  }
}
