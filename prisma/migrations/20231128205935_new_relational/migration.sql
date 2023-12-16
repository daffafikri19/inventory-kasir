/*
  Warnings:

  - You are about to alter the column `daily_revenue` on the `laporan` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.
  - You are about to drop the column `boothId` on the `stok` table. All the data in the column will be lost.
  - You are about to drop the `_ordertoorderdetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orderdetail` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[boothId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stokId` to the `Laporan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `boothId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_ordertoorderdetail` DROP FOREIGN KEY `_OrderToOrderDetail_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ordertoorderdetail` DROP FOREIGN KEY `_OrderToOrderDetail_B_fkey`;

-- DropForeignKey
ALTER TABLE `orderdetail` DROP FOREIGN KEY `OrderDetail_productId_fkey`;

-- DropForeignKey
ALTER TABLE `stok` DROP FOREIGN KEY `Stok_boothId_fkey`;

-- AlterTable
ALTER TABLE `laporan` ADD COLUMN `stokId` VARCHAR(191) NOT NULL,
    MODIFY `daily_revenue` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `order` ADD COLUMN `boothId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `stok` DROP COLUMN `boothId`;

-- DropTable
DROP TABLE `_ordertoorderdetail`;

-- DropTable
DROP TABLE `orderdetail`;

-- CreateTable
CREATE TABLE `orderItem` (
    `id` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `totalPrice` INTEGER NOT NULL,
    `catatan` VARCHAR(191) NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `orderItem_productId_idx`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_OrderToorderItem` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_OrderToorderItem_AB_unique`(`A`, `B`),
    INDEX `_OrderToorderItem_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_StokTobooth` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_StokTobooth_AB_unique`(`A`, `B`),
    INDEX `_StokTobooth_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_LaporanToOrder` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_LaporanToOrder_AB_unique`(`A`, `B`),
    INDEX `_LaporanToOrder_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Order_boothId_key` ON `Order`(`boothId`);

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_boothId_fkey` FOREIGN KEY (`boothId`) REFERENCES `booth`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderItem` ADD CONSTRAINT `orderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Laporan` ADD CONSTRAINT `Laporan_stokId_fkey` FOREIGN KEY (`stokId`) REFERENCES `Stok`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `_OrderToorderItem` ADD CONSTRAINT `_OrderToorderItem_A_fkey` FOREIGN KEY (`A`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OrderToorderItem` ADD CONSTRAINT `_OrderToorderItem_B_fkey` FOREIGN KEY (`B`) REFERENCES `orderItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_StokTobooth` ADD CONSTRAINT `_StokTobooth_A_fkey` FOREIGN KEY (`A`) REFERENCES `Stok`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_StokTobooth` ADD CONSTRAINT `_StokTobooth_B_fkey` FOREIGN KEY (`B`) REFERENCES `booth`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LaporanToOrder` ADD CONSTRAINT `_LaporanToOrder_A_fkey` FOREIGN KEY (`A`) REFERENCES `Laporan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LaporanToOrder` ADD CONSTRAINT `_LaporanToOrder_B_fkey` FOREIGN KEY (`B`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
