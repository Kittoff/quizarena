import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { AuthenticatedUser } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RankingService } from './ranking.service';

const MAX_LIMIT = 100;

@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get()
  getTop(@Query('limit') limit?: string) {
    const parsed = limit ? Math.min(parseInt(limit, 10), MAX_LIMIT) : undefined;
    return this.rankingService.getTopPlayers(
      Number.isNaN(parsed) ? undefined : parsed,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMyRank(@Req() req: Request & { user: AuthenticatedUser }) {
    const rank = await this.rankingService.getUserRank(req.user.id);
    return { rank };
  }
}
