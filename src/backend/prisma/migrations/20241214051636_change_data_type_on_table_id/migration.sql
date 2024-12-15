/*
  Warnings:

  - The primary key for the `table` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_table_id_fkey`;

-- AlterTable
ALTER TABLE `order` MODIFY `table_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `table` DROP PRIMARY KEY,
    MODIFY `table_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`table_id`);

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_table_id_fkey` FOREIGN KEY (`table_id`) REFERENCES `Table`(`table_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
