-- CreateTable
CREATE TABLE "email_verification" (
    "id" SERIAL NOT NULL,
    "token" VARCHAR(100) NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "email_verification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "email_verification_token_key" ON "email_verification"("token");

-- CreateIndex
CREATE UNIQUE INDEX "email_verification_email_key" ON "email_verification"("email");

-- CreateIndex
CREATE UNIQUE INDEX "email_verification_email_token_key" ON "email_verification"("email", "token");
