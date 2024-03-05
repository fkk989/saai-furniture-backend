/*
  Warnings:

  - A unique constraint covering the columns `[title1]` on the table `Blog` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Blog_title1_key" ON "Blog"("title1");
