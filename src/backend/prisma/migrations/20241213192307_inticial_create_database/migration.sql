-- CreateTable
CREATE TABLE `Account` (
    `acc_id` INTEGER NOT NULL AUTO_INCREMENT,
    `acc_fname` VARCHAR(191) NOT NULL,
    `acc_lname` VARCHAR(191) NOT NULL,
    `role` ENUM('admin', 'customer', 'cashier', 'waiter', 'chef') NOT NULL,
    `date_create` DATETIME(3) NOT NULL,

    PRIMARY KEY (`acc_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Username` (
    `acc_id` INTEGER NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`acc_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cart` (
    `cart_id` INTEGER NOT NULL AUTO_INCREMENT,
    `acc_id` INTEGER NOT NULL,

    PRIMARY KEY (`cart_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CartDetail` (
    `cart_id` INTEGER NOT NULL,
    `food_id` INTEGER NOT NULL,
    `quantify` INTEGER NOT NULL,

    PRIMARY KEY (`cart_id`, `food_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Food` (
    `food_id` INTEGER NOT NULL AUTO_INCREMENT,
    `food_name` VARCHAR(191) NOT NULL,
    `food_price` DOUBLE NOT NULL,
    `food_img` VARCHAR(191) NULL,
    `text` VARCHAR(191) NULL,
    `date_create` DATETIME(3) NOT NULL,
    `cat_id` INTEGER NOT NULL,

    PRIMARY KEY (`food_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `cat_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cat_name` VARCHAR(191) NOT NULL,
    `cat_img` VARCHAR(191) NULL,

    PRIMARY KEY (`cat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rating` (
    `rate_id` INTEGER NOT NULL AUTO_INCREMENT,
    `acc_id` INTEGER NOT NULL,
    `food_id` INTEGER NOT NULL,
    `score` INTEGER NOT NULL,
    `detail` VARCHAR(191) NULL,

    PRIMARY KEY (`rate_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `order_id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_date` DATETIME(3) NOT NULL,
    `table_id` INTEGER NOT NULL,
    `dtime` DATETIME(3) NOT NULL,
    `recipt_file` VARCHAR(191) NULL,
    `order_status` ENUM('ordering', 'pending', 'complete') NOT NULL,
    `acc_id` INTEGER NOT NULL,

    PRIMARY KEY (`order_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderDetail` (
    `order_id` INTEGER NOT NULL,
    `food_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`order_id`, `food_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Table` (
    `table_id` INTEGER NOT NULL AUTO_INCREMENT,
    `table_name` VARCHAR(191) NOT NULL,
    `table_status` ENUM('idel', 'busy', 'ordered') NOT NULL,

    PRIMARY KEY (`table_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `order_id` INTEGER NOT NULL,
    `slip_image` VARCHAR(191) NULL,
    `pay_time` DATETIME(3) NOT NULL,
    `status` ENUM('pending', 'paid', 'fail') NOT NULL,
    `method` ENUM('cash', 'promptpay') NOT NULL,

    PRIMARY KEY (`order_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Username` ADD CONSTRAINT `Username_acc_id_fkey` FOREIGN KEY (`acc_id`) REFERENCES `Account`(`acc_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_acc_id_fkey` FOREIGN KEY (`acc_id`) REFERENCES `Account`(`acc_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartDetail` ADD CONSTRAINT `CartDetail_cart_id_fkey` FOREIGN KEY (`cart_id`) REFERENCES `Cart`(`cart_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartDetail` ADD CONSTRAINT `CartDetail_food_id_fkey` FOREIGN KEY (`food_id`) REFERENCES `Food`(`food_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Food` ADD CONSTRAINT `Food_cat_id_fkey` FOREIGN KEY (`cat_id`) REFERENCES `Category`(`cat_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rating` ADD CONSTRAINT `Rating_acc_id_fkey` FOREIGN KEY (`acc_id`) REFERENCES `Account`(`acc_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rating` ADD CONSTRAINT `Rating_food_id_fkey` FOREIGN KEY (`food_id`) REFERENCES `Food`(`food_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_acc_id_fkey` FOREIGN KEY (`acc_id`) REFERENCES `Account`(`acc_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_table_id_fkey` FOREIGN KEY (`table_id`) REFERENCES `Table`(`table_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderDetail` ADD CONSTRAINT `OrderDetail_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Order`(`order_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderDetail` ADD CONSTRAINT `OrderDetail_food_id_fkey` FOREIGN KEY (`food_id`) REFERENCES `Food`(`food_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Order`(`order_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
