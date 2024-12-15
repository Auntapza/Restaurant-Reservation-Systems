/*
  Warnings:

  - A unique constraint covering the columns `[acc_id]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Cart_acc_id_key` ON `Cart`(`acc_id`);
