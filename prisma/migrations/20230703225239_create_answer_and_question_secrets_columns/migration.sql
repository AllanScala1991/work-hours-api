/*
  Warnings:

  - Added the required column `secretAnswer` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secretQuestion` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "secretAnswer" TEXT NOT NULL,
ADD COLUMN     "secretQuestion" TEXT NOT NULL;
