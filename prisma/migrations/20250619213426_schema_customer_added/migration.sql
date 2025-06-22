-- CreateTable
CREATE TABLE "CustomOrder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "flavors" TEXT,
    "decorations" TEXT NOT NULL,
    "delivery" DATETIME NOT NULL,
    "adress" TEXT NOT NULL,
    "price" REAL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
