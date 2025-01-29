-- AlterTable
ALTER TABLE `orderdetail` ADD COLUMN `complete` ENUM('complete', 'none') NOT NULL DEFAULT 'none';
