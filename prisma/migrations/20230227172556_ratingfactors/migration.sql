-- CreateTable
CREATE TABLE "RatingCategories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RatingCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RatingFactors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "importance" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "RatingFactors_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RatingFactors" ADD CONSTRAINT "RatingFactors_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "RatingCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
