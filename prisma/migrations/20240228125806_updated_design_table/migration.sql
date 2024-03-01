/*
  Warnings:

  - You are about to drop the column `description` on the `SofaDesign` table. All the data in the column will be lost.
  - You are about to drop the column `popular` on the `SofaDesign` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SofaDesign" DROP COLUMN "description",
DROP COLUMN "popular";
