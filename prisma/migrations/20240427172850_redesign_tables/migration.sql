/*
  Warnings:

  - You are about to drop the column `firstName` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `profile` table. All the data in the column will be lost.
  - Added the required column `schoolId` to the `profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_userId_fkey";

-- DropIndex
DROP INDEX "profile_userId_type_idx";

-- DropIndex
DROP INDEX "user_name_email_id_idx";

-- AlterTable
ALTER TABLE "profile" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "schoolId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "type" "ProfileType" NOT NULL DEFAULT 'STUDENT';

-- CreateTable
CREATE TABLE "school" (
    "id" SERIAL NOT NULL,
    "uuid" VARCHAR(100) NOT NULL,
    "motto" VARCHAR(200) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "school_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "class" (
    "id" SERIAL NOT NULL,
    "uuid" VARCHAR(100) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "schoolId" INTEGER NOT NULL,

    CONSTRAINT "class_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "school_uuid_key" ON "school"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "school_name_key" ON "school"("name");

-- CreateIndex
CREATE UNIQUE INDEX "class_uuid_key" ON "class"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "class_schoolId_name_key" ON "class"("schoolId", "name");

-- CreateIndex
CREATE INDEX "user_email_id_idx" ON "user"("email", "id");

-- AddForeignKey
ALTER TABLE "class" ADD CONSTRAINT "class_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
