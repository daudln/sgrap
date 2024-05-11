/*
  Warnings:

  - The `type` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Teacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `class` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'NORMAL_USER');

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_profileUserId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_profileUserId_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "class" DROP CONSTRAINT "class_schoolId_fkey";

-- AlterTable
ALTER TABLE "profile" ADD COLUMN     "type" "ProfileType" NOT NULL DEFAULT 'STUDENT';

-- AlterTable
ALTER TABLE "user" DROP COLUMN "type",
ADD COLUMN     "type" "UserType" NOT NULL DEFAULT 'NORMAL_USER';

-- DropTable
DROP TABLE "Student";

-- DropTable
DROP TABLE "Teacher";

-- DropTable
DROP TABLE "class";

-- CreateTable
CREATE TABLE "teacher" (
    "profileUserId" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,

    CONSTRAINT "teacher_pkey" PRIMARY KEY ("profileUserId")
);

-- CreateTable
CREATE TABLE "student" (
    "profileUserId" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "classLevel" "StudentClass" NOT NULL,

    CONSTRAINT "student_pkey" PRIMARY KEY ("profileUserId")
);

-- CreateIndex
CREATE UNIQUE INDEX "teacher_profileUserId_key" ON "teacher"("profileUserId");

-- CreateIndex
CREATE UNIQUE INDEX "teacher_profileUserId_schoolId_key" ON "teacher"("profileUserId", "schoolId");

-- CreateIndex
CREATE UNIQUE INDEX "student_profileUserId_key" ON "student"("profileUserId");

-- CreateIndex
CREATE UNIQUE INDEX "student_schoolId_profileUserId_classLevel_key" ON "student"("schoolId", "profileUserId", "classLevel");

-- AddForeignKey
ALTER TABLE "teacher" ADD CONSTRAINT "teacher_profileUserId_fkey" FOREIGN KEY ("profileUserId") REFERENCES "profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher" ADD CONSTRAINT "teacher_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_profileUserId_fkey" FOREIGN KEY ("profileUserId") REFERENCES "profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
