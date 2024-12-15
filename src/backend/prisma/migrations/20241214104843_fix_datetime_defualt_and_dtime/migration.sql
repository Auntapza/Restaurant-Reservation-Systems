/*
  Warnings:

  - You are about to drop the column `dtime` on the `order` table. All the data in the column will be lost.
  - Added the required column `time` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `food` MODIFY `date_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `order` DROP COLUMN `dtime`,
    ADD COLUMN `time` DATETIME(3) NOT NULL,
    MODIFY `order_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
