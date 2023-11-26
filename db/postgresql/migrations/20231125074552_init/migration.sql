/*
  Warnings:

  - You are about to drop the column `user_id` on the `service` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "service_user_id_idx";

-- DropIndex
DROP INDEX "user_user_id_key";

-- AlterTable
ALTER TABLE "service" DROP COLUMN "user_id",
ADD COLUMN     "user_email" VARCHAR(255);

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "email" VARCHAR(255) NOT NULL,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("email");

-- CreateIndex
CREATE INDEX "service_user_email_idx" ON "service"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
