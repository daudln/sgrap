/*
  Warnings:

  - A unique constraint covering the columns `[schoolId,profileUserId,classLevel]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `classLevel` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StudentClass" AS ENUM ('FORM_ONE', 'FORM_TWO', 'FORM_THREE', 'FORM_FOUR', 'FORM_FIVE', 'FORM_SIX');

-- DropIndex
DROP INDEX "Student_schoolId_profileUserId_key";

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "classLevel" "StudentClass" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student_schoolId_profileUserId_classLevel_key" ON "Student"("schoolId", "profileUserId", "classLevel");
