import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { prisma } from '@quiz-arena/database';

@Injectable()
export class PrismaService implements OnModuleDestroy {
  get db() {
    return prisma;
  }

  async onModuleDestroy() {
    await prisma.$disconnect();
  }
}
