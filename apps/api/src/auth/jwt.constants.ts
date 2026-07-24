import { Logger } from '@nestjs/common';

const FALLBACK_SECRET = 'dev-secret-change-me';

if (!process.env.JWT_SECRET) {
  new Logger('AuthModule').warn(
    'JWT_SECRET is not set — using an insecure default. Set JWT_SECRET in production.',
  );
}

export const JWT_SECRET = process.env.JWT_SECRET ?? FALLBACK_SECRET;
export const JWT_EXPIRATION = '30d';
