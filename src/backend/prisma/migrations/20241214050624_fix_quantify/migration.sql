/*
  Warnings:

  - You are about to drop the column `quantify` on the `cartdetail` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `CartDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cartdetail` DROP COLUMN `quantify`,
    ADD COLUMN `quantity` INTEGER NOT NULL;
