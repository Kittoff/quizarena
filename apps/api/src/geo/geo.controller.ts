import { Controller, Get, Req } from '@nestjs/common';
import type { Request } from 'express';
import { GeoService } from './geo.service';

function extractClientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress ?? '';
}

@Controller('geo')
export class GeoController {
  constructor(private readonly geoService: GeoService) {}

  @Get('language')
  getLanguage(@Req() req: Request) {
    const ip = extractClientIp(req);
    return { language: this.geoService.guessLanguage(ip) };
  }
}
