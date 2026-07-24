import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import { questions } from "./data/questions";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Import questions");

  await prisma.answerTranslation.deleteMany();

  await prisma.answer.deleteMany();

  await prisma.translation.deleteMany();

  await prisma.question.deleteMany();

  for (const item of questions) {
    await prisma.question.create({
      data: {
        category: item.category,

        difficulty: item.difficulty,

        translations: {
          create: Object.entries(item.question).map(([language, text]) => ({
            language,

            text,
          })),
        },

        answers: {
          create: item.answers.map((answer) => ({
            correct: answer.correct,

            translations: {
              create: Object.entries(answer.text).map(([language, text]) => ({
                language,

                text,
              })),
            },
          })),
        },
      },
    });
  }

  console.log(`✅ ${questions.length} questions ajoutées`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (error) => {
    console.error(error);

    await prisma.$disconnect();

    process.exit(1);
  });
