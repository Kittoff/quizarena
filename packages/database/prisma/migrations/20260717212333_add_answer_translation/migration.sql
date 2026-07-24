/*
  Warnings:

  - You are about to drop the column `text` on the `Answer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "text";

-- CreateTable
CREATE TABLE "AnswerTranslation" (
    "id" SERIAL NOT NULL,
    "language" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "answerId" INTEGER NOT NULL,

    CONSTRAINT "AnswerTranslation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AnswerTranslation" ADD CONSTRAINT "AnswerTranslation_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
