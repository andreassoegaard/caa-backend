/*
  Warnings:

  - You are about to drop the column `ratingCategoryId` on the `Companies` table. All the data in the column will be lost.
  - Added the required column `qaCategoryId` to the `Companies` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Companies" DROP CONSTRAINT "Companies_ratingCategoryId_fkey";

-- AlterTable
ALTER TABLE "Companies" DROP COLUMN "ratingCategoryId",
ADD COLUMN     "qaCategoryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Companies" ADD CONSTRAINT "Companies_qaCategoryId_fkey" FOREIGN KEY ("qaCategoryId") REFERENCES "QaCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
