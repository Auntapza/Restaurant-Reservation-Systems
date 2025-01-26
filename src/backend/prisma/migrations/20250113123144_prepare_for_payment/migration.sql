/*
  Warnings:

  - You are about to drop the column `recipt_file` on the `order` table. All the data in the column will be lost.
  - Added the required column `pay_count` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Made the column `slip_image` on table `payment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `recipt_file`;

-- AlterTable
ALTER TABLE `payment` ADD COLUMN `pay_count` INTEGER NOT NULL,
    MODIFY `slip_image` VARCHAR(191) NOT NULL;
