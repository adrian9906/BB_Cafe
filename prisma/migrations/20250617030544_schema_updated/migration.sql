-- CreateTable
CREATE TABLE "StockProduct" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stock" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "StockProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
