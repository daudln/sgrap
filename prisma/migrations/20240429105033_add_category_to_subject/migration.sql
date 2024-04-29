-- CreateEnum
CREATE TYPE "SubjectCategory" AS ENUM ('SCIENCE', 'ART');

-- AlterTable
ALTER TABLE "subject" ADD COLUMN     "category" "SubjectCategory" NOT NULL DEFAULT 'ART';
