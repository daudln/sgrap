/*
  Warnings:

  - You are about to drop the column `createdAt` on the `reset_password_token` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `reset_password_token` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `reset_password_token` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `reset_password_token` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `reset_password_token` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email,token]` on the table `reset_password_token` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `reset_password_token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires` to the `reset_password_token` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "reset_password_token" DROP CONSTRAINT "reset_password_token_userId_fkey";

-- AlterTable
ALTER TABLE "reset_password_token" DROP COLUMN "createdAt",
DROP COLUMN "expiresAt",
DROP COLUMN "isActive",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "expires" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "reset_password_token_email_token_key" ON "reset_password_token"("email", "token");
