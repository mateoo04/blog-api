/*
  Warnings:

  - You are about to drop the column `isAuthor` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isAuthor",
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;
