import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';

const USERNAME_REGEX = /^[a-zA-Z0-9_-]{3,20}$/;
const MIN_PASSWORD_LENGTH = 6;
const PASSWORD_SALT_ROUNDS = 10;

export interface AuthenticatedUser {
  id: string;
  username: string;
  xp: number;
  level: number;
  wins: number;
  losses: number;
}

interface UserRecord {
  id: string;
  username: string;
  password: string;
  xp: number;
  level: number;
  wins: number;
  losses: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(username: string, password: string) {
    this.validateCredentials(username, password);

    const existing = await this.usersService.findByUsername(username);
    if (existing) {
      throw new ConflictException('Ce pseudo est déjà pris');
    }

    const hashedPassword = await bcrypt.hash(password, PASSWORD_SALT_ROUNDS);
    const user = await this.usersService.create(username, hashedPassword);

    return this.buildAuthResponse(user);
  }

  async login(username: string, password: string) {
    this.validateCredentials(username, password);

    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    return this.buildAuthResponse(user);
  }

  async validateUserById(userId: string): Promise<AuthenticatedUser | null> {
    const user = await this.usersService.findById(userId);
    return user ? this.toPublicUser(user) : null;
  }

  private buildAuthResponse(user: UserRecord) {
    const accessToken = this.jwtService.sign({
      sub: user.id,
      username: user.username,
    });

    return { accessToken, user: this.toPublicUser(user) };
  }

  private toPublicUser(user: UserRecord): AuthenticatedUser {
    return {
      id: user.id,
      username: user.username,
      xp: user.xp,
      level: user.level,
      wins: user.wins,
      losses: user.losses,
    };
  }

  private validateCredentials(username: string, password: string) {
    if (!username || !USERNAME_REGEX.test(username)) {
      throw new BadRequestException(
        'Le pseudo doit contenir entre 3 et 20 caractères (lettres, chiffres, - ou _)',
      );
    }

    if (!password || password.length < MIN_PASSWORD_LENGTH) {
      throw new BadRequestException(
        `Le mot de passe doit contenir au moins ${MIN_PASSWORD_LENGTH} caractères`,
      );
    }
  }
}
