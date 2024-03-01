/*
  Warnings:

  - You are about to drop the column `title` on the `Query` table. All the data in the column will be lost.
  - Added the required column `email` to the `Query` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Query` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Query` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Query" DROP COLUMN "title",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;
