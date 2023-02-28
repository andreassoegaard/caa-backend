/*
  Warnings:

  - You are about to drop the column `ratingFactorsAnswers` on the `Companies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Companies" DROP COLUMN "ratingFactorsAnswers";

-- CreateTable
CREATE TABLE "RatingFactorsAnswers" (
    "id" SERIAL NOT NULL,
    "answer" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "ratingFactorId" INTEGER NOT NULL,

    CONSTRAINT "RatingFactorsAnswers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RatingFactorsAnswers" ADD CONSTRAINT "RatingFactorsAnswers_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingFactorsAnswers" ADD CONSTRAINT "RatingFactorsAnswers_ratingFactorId_fkey" FOREIGN KEY ("ratingFactorId") REFERENCES "RatingFactors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
