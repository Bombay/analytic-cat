/*
  Warnings:

  - You are about to drop the column `user_email` on the `service` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "service_user_email_idx";

-- AlterTable
ALTER TABLE "service" DROP COLUMN "user_email",
ADD COLUMN     "user_id" UUID;

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "service_user_id_idx" ON "service"("user_id");
