import { BadRequestException, Injectable } from '@nestjs/common';
import { prisma } from '@quiz-arena/database';

const USERNAME_REGEX = /^[a-zA-Z0-9_-]{3,20}$/;

@Injectable()
export class UsersService {
  async identify(username: string) {
    if (!username || !USERNAME_REGEX.test(username)) {
      throw new BadRequestException(
        'Le pseudo doit contenir entre 3 et 20 caractères (lettres, chiffres, - ou _)',
      );
    }

    const existing = await prisma.user.findUnique({ where: { username } });
    if (existing) return existing;

    return prisma.user.create({ data: { username } });
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
