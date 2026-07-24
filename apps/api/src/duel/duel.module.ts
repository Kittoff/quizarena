import { Module } from '@nestjs/common';
import { QuestionsModule } from '../questions/questions.module';
import { UsersModule } from '../users/users.module';
import { DuelGateway } from './duel.gateway';
import { DuelService } from './duel.service';

@Module({
  imports: [QuestionsModule, UsersModule],
  providers: [DuelGateway, DuelService],
})
export class DuelModule {}
