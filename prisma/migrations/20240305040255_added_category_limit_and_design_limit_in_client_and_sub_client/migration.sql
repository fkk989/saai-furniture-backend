/*
  Warnings:

  - Added the required column `categoryLimit` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `designLimit` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryLimit` to the `SubClient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `designLimit` to the `SubClient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "categoryLimit" INTEGER NOT NULL,
ADD COLUMN     "designLimit" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SubClient" ADD COLUMN     "categoryLimit" INTEGER NOT NULL,
ADD COLUMN     "designLimit" INTEGER NOT NULL;
