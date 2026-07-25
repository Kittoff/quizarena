import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@quiz-arena/database';

const DEFAULT_LANGUAGE = 'fr';

interface Translation {
  language: string;
  text: string;
}

interface AnswerWithTranslations {
  id: number;
  translations: Translation[];
}

export interface QuestionWithRelations {
  id: number;
  category: string;
  difficulty: number;
  translations: Translation[];
  answers: AnswerWithTranslations[];
}

export interface PublicAnswer {
  id: number;
  text: string;
}

export interface PublicQuestion {
  id: number;
  category: string;
  difficulty: number;
  text: string;
  answers: PublicAnswer[];
}

@Injectable()
export class QuestionsService {
  findAllRaw(): Promise<QuestionWithRelations[]> {
    return prisma.question.findMany({
      include: {
        translations: true,
        answers: {
          include: { translations: true },
        },
      },
    });
  }

  async findAll(lang: string = DEFAULT_LANGUAGE): Promise<PublicQuestion[]> {
    const questions = await this.findAllRaw();
    return this.shuffle(questions).map((question) =>
      this.project(question, lang),
    );
  }

  async findRandomRaw(count: number): Promise<QuestionWithRelations[]> {
    const all = await this.findAllRaw();
    return this.shuffle(all).slice(0, count);
  }

  async findRandom(
    count: number,
    lang: string = DEFAULT_LANGUAGE,
  ): Promise<PublicQuestion[]> {
    const questions = await this.findRandomRaw(count);
    return questions.map((question) => this.project(question, lang));
  }

  project(question: QuestionWithRelations, lang: string): PublicQuestion {
    return {
      id: question.id,
      category: question.category,
      difficulty: question.difficulty,
      text: this.pickText(question.translations, lang),
      answers: this.shuffle(
        question.answers.map((answer) => ({
          id: answer.id,
          text: this.pickText(answer.translations, lang),
        })),
      ),
    };
  }

  async checkAnswer(questionId: number, answerId: number) {
    const answer = await prisma.answer.findFirst({
      where: { id: answerId, questionId },
    });

    if (!answer) {
      throw new NotFoundException('Answer not found for this question');
    }

    const correctAnswer = await prisma.answer.findFirst({
      where: { questionId, correct: true },
    });

    return {
      correct: answer.correct,
      correctAnswerId: correctAnswer?.id ?? null,
    };
  }

  private shuffle<T>(items: T[]): T[] {
    const array = [...items];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  private pickText(translations: Translation[], lang: string) {
    return (
      translations.find((t) => t.language === lang)?.text ??
      translations.find((t) => t.language === DEFAULT_LANGUAGE)?.text ??
      translations[0]?.text ??
      ''
    );
  }
}
