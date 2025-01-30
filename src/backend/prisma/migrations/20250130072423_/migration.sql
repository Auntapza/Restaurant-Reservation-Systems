-- AlterTable
ALTER TABLE `order` MODIFY `order_status` ENUM('ordering', 'pending', 'complete', 'cancel') NOT NULL;
