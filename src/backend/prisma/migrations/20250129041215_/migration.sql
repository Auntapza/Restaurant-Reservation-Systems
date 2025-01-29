-- AlterTable
ALTER TABLE `orderdetail` MODIFY `complete` ENUM('complete', 'waitServe', 'none') NOT NULL DEFAULT 'none';
