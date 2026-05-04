/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "AnswerComment_userId_answerId_key";

-- DropIndex
DROP INDEX "QuestionComment_userId_questionId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");
