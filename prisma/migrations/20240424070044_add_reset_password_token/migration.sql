-- CreateTable
CREATE TABLE "reset_password_token" (
    "id" SERIAL NOT NULL,
    "token" VARCHAR(100) NOT NULL,
    "userId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "reset_password_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reset_password_token_token_key" ON "reset_password_token"("token");

-- AddForeignKey
ALTER TABLE "reset_password_token" ADD CONSTRAINT "reset_password_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
