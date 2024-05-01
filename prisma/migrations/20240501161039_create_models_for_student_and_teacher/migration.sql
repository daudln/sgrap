-- CreateTable
CREATE TABLE "Teacher" (
    "profileUserId" TEXT NOT NULL,
    "schoolId" INTEGER NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("profileUserId")
);

-- CreateTable
CREATE TABLE "Student" (
    "profileUserId" TEXT NOT NULL,
    "schoolId" INTEGER NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("profileUserId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_profileUserId_key" ON "Teacher"("profileUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_profileUserId_schoolId_key" ON "Teacher"("profileUserId", "schoolId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_profileUserId_key" ON "Student"("profileUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_schoolId_profileUserId_key" ON "Student"("schoolId", "profileUserId");

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_profileUserId_fkey" FOREIGN KEY ("profileUserId") REFERENCES "profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_profileUserId_fkey" FOREIGN KEY ("profileUserId") REFERENCES "profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
