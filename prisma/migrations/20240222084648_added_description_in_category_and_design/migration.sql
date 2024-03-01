/*
  Warnings:

  - Added the required column `description` to the `SofaCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `SofaDesign` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SofaCategory" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SofaDesign" ADD COLUMN     "description" TEXT NOT NULL;
