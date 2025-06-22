/*
  Warnings:

  - You are about to alter the column `decorations` on the `CustomOrder` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.
  - Added the required column `quantity` to the `CustomOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `CustomOrder` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CustomOrder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "flavors" TEXT,
    "decorations" BOOLEAN NOT NULL,
    "delivery" DATETIME NOT NULL,
    "adress" TEXT NOT NULL,
    "price" REAL DEFAULT 0,
    "theme" TEXT,
    "type" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "request" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_CustomOrder" ("adress", "createdAt", "decorations", "delivery", "email", "flavors", "id", "name", "phone", "price", "updatedAt") SELECT "adress", "createdAt", "decorations", "delivery", "email", "flavors", "id", "name", "phone", "price", "updatedAt" FROM "CustomOrder";
DROP TABLE "CustomOrder";
ALTER TABLE "new_CustomOrder" RENAME TO "CustomOrder";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
