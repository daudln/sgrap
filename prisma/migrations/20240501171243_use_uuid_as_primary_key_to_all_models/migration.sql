/*
  Warnings:

  - The primary key for the `school` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `school` table. All the data in the column will be lost.
  - The primary key for the `subject` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `subject` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "class" DROP CONSTRAINT "class_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_schoolId_fkey";

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "schoolId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Teacher" ALTER COLUMN "schoolId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "class" ALTER COLUMN "schoolId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "profile" ALTER COLUMN "schoolId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "school" DROP CONSTRAINT "school_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "school_pkey" PRIMARY KEY ("uuid");

-- AlterTable
ALTER TABLE "subject" DROP CONSTRAINT "subject_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "subject_pkey" PRIMARY KEY ("uuid");

-- AddForeignKey
ALTER TABLE "class" ADD CONSTRAINT "class_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
