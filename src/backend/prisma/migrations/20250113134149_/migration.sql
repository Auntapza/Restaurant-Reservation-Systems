/*
  Warnings:

  - You are about to drop the column `pay_price` on the `reservation_payment` table. All the data in the column will be lost.
  - Added the required column `pay_count` to the `reservation_payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reservation_payment` DROP COLUMN `pay_price`,
    ADD COLUMN `pay_count` INTEGER NOT NULL;
