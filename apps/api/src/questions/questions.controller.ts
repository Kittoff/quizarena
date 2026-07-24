import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  findAll(@Query('lang') lang?: string) {
    return this.questionsService.findAll(lang);
  }

  @Post(':id/answer')
  checkAnswer(
    @Param('id', ParseIntPipe) id: number,
    @Body('answerId', ParseIntPipe) answerId: number,
  ) {
    return this.questionsService.checkAnswer(id, answerId);
  }
}
