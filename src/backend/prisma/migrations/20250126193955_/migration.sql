/*
  Warnings:

  - You are about to drop the column `order_time` on the `order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `order_time`,
    ADD COLUMN `service_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
