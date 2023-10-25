/*
  Warnings:

  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_training_id_fkey";

-- DropTable
DROP TABLE "Review";

-- CreateTable
CREATE TABLE "reviews" (
    "review_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "training_id" INTEGER NOT NULL,
    "raiting" INTEGER NOT NULL DEFAULT 0,
    "message" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("review_id")
);

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "trainings"("training_id") ON DELETE CASCADE ON UPDATE CASCADE;
