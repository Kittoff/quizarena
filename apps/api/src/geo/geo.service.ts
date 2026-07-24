import { Injectable } from '@nestjs/common';
import geoip from 'geoip-lite';

export type GuessedLanguage = 'fr' | 'en' | 'ja';

const FRENCH_SPEAKING_COUNTRIES = new Set([
  'FR',
  'BE',
  'CH',
  'CA',
  'LU',
  'MC',
  'SN',
  'CI',
  'MA',
  'TN',
  'DZ',
]);

@Injectable()
export class GeoService {
  guessLanguage(ip: string): GuessedLanguage | null {
    const normalizedIp = ip.replace(/^::ffff:/, '');
    const result = geoip.lookup(normalizedIp);

    if (!result) return null;
    if (result.country === 'JP') return 'ja';
    if (FRENCH_SPEAKING_COUNTRIES.has(result.country)) return 'fr';
    return 'en';
  }
}
