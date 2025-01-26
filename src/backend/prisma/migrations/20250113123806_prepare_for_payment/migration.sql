/*
  Warnings:

  - You are about to drop the `payment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_order_id_fkey`;

-- AlterTable
ALTER TABLE `order` ADD COLUMN `recipt_img` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `payment`;

-- CreateTable
CREATE TABLE `reservation_payment` (
    `order_id` INTEGER NOT NULL,
    `slip_image` VARCHAR(191) NOT NULL,
    `pay_time` DATETIME(3) NOT NULL,
    `pay_count` INTEGER NOT NULL,
    `status` ENUM('pending', 'paid', 'fail') NOT NULL,
    `method` ENUM('cash', 'promptpay') NOT NULL,

    PRIMARY KEY (`order_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `reservation_payment` ADD CONSTRAINT `Payment_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `order`(`order_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
