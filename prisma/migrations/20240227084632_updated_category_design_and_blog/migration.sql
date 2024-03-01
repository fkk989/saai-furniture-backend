/*
  Warnings:

  - You are about to drop the column `description` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Blog` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `SofaCategory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `SofaDesign` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description1` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title1` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "description1" TEXT NOT NULL,
ADD COLUMN     "description3" TEXT,
ADD COLUMN     "description4" TEXT,
ADD COLUMN     "title1" TEXT NOT NULL,
ADD COLUMN     "title2" TEXT,
ADD COLUMN     "title3" TEXT,
ADD COLUMN     "title4" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "SofaCategory_title_key" ON "SofaCategory"("title");

-- CreateIndex
CREATE UNIQUE INDEX "SofaDesign_title_key" ON "SofaDesign"("title");
