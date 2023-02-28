/*
  Warnings:

  - Added the required column `ratingFactorsAnswers` to the `Companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Quotes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Companies" ADD COLUMN     "ratingFactorsAnswers" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Quotes" ADD COLUMN     "companyId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "RatingFactors" ALTER COLUMN "description" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Quotes" ADD CONSTRAINT "Quotes_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
