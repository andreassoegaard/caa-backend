/*
  Warnings:

  - You are about to drop the column `ratingFactorId` on the `QaFactorsAnswers` table. All the data in the column will be lost.
  - Added the required column `qaCategoryId` to the `QaFactorsAnswers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qaFactorId` to the `QaFactorsAnswers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "QaFactorsAnswers" DROP CONSTRAINT "QaFactorsAnswers_ratingFactorId_fkey";

-- AlterTable
ALTER TABLE "QaFactorsAnswers" DROP COLUMN "ratingFactorId",
ADD COLUMN     "qaCategoryId" INTEGER NOT NULL,
ADD COLUMN     "qaFactorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "QaFactorsAnswers" ADD CONSTRAINT "QaFactorsAnswers_qaFactorId_fkey" FOREIGN KEY ("qaFactorId") REFERENCES "QaFactors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QaFactorsAnswers" ADD CONSTRAINT "QaFactorsAnswers_qaCategoryId_fkey" FOREIGN KEY ("qaCategoryId") REFERENCES "QaCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
