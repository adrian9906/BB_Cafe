-- CreateTable
CREATE TABLE "Cart" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "items" TEXT NOT NULL,
    "SessionID" TEXT,
    "productID" TEXT,
    "total" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Cart_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
