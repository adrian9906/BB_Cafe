/*
  Warnings:

  - Added the required column `email` to the `Workers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Workers` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Workers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL
);
INSERT INTO "new_Workers" ("description", "id", "image", "name", "position") SELECT "description", "id", "image", "name", "position" FROM "Workers";
DROP TABLE "Workers";
ALTER TABLE "new_Workers" RENAME TO "Workers";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
