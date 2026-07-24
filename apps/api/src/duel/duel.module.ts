import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { QuestionsModule } from '../questions/questions.module';
import { UsersModule } from '../users/users.module';
import { DuelGateway } from './duel.gateway';
import { DuelService } from './duel.service';

@Module({
  imports: [QuestionsModule, UsersModule, AuthModule],
  providers: [DuelGateway, DuelService],
})
export class DuelModule {}
