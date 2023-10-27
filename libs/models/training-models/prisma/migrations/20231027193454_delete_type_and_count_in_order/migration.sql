/*
  Warnings:

  - You are about to drop the column `trainingType` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `typeCount` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "trainingType",
DROP COLUMN "typeCount";
