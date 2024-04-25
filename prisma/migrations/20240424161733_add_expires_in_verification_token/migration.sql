/*
  Warnings:

  - Added the required column `expires` to the `email_verification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "email_verification" ADD COLUMN     "expires" TIMESTAMP(3) NOT NULL;
