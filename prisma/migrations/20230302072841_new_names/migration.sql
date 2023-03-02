/*
  Warnings:

  - You are about to drop the `RatingCategories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RatingFactors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RatingFactorsAnswers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Companies" DROP CONSTRAINT "Companies_ratingCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "RatingFactors" DROP CONSTRAINT "RatingFactors_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "RatingFactorsAnswers" DROP CONSTRAINT "RatingFactorsAnswers_companyId_fkey";

-- DropForeignKey
ALTER TABLE "RatingFactorsAnswers" DROP CONSTRAINT "RatingFactorsAnswers_ratingFactorId_fkey";

-- DropTable
DROP TABLE "RatingCategories";

-- DropTable
DROP TABLE "RatingFactors";

-- DropTable
DROP TABLE "RatingFactorsAnswers";

-- CreateTable
CREATE TABLE "QaCategories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "QaCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QaFactors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "importance" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "QaFactors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QaFactorsAnswers" (
    "id" SERIAL NOT NULL,
    "answer" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "ratingFactorId" INTEGER NOT NULL,

    CONSTRAINT "QaFactorsAnswers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QaFactors" ADD CONSTRAINT "QaFactors_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "QaCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QaFactorsAnswers" ADD CONSTRAINT "QaFactorsAnswers_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QaFactorsAnswers" ADD CONSTRAINT "QaFactorsAnswers_ratingFactorId_fkey" FOREIGN KEY ("ratingFactorId") REFERENCES "QaFactors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Companies" ADD CONSTRAINT "Companies_ratingCategoryId_fkey" FOREIGN KEY ("ratingCategoryId") REFERENCES "QaCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
