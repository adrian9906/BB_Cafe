/*
  Warnings:

  - You are about to drop the column `adress` on the `CustomOrder` table. All the data in the column will be lost.
  - You are about to drop the column `delivery` on the `CustomOrder` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `CustomOrder` table. All the data in the column will be lost.
  - Added the required column `address` to the `CustomOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryDate` to the `CustomOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CustomOrder" DROP COLUMN "adress",
DROP COLUMN "delivery",
DROP COLUMN "image",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "deliveryAddress" TEXT,
ADD COLUMN     "deliveryDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "referenceImage" TEXT,
ADD COLUMN     "specialRequests" TEXT,
ALTER COLUMN "decorations" DROP NOT NULL,
ALTER COLUMN "decorations" SET DATA TYPE TEXT,
ALTER COLUMN "themeType" DROP DEFAULT;
