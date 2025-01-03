/*
  Warnings:

  - The values [idel] on the enum `table_table_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `table` MODIFY `table_status` ENUM('idle', 'busy', 'ordered') NOT NULL;
