/*
  Warnings:

  - The primary key for the `messages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `messages` table. All the data in the column will be lost.
  - The required column `message_id` was added to the `messages` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "messages" DROP CONSTRAINT "messages_pkey",
DROP COLUMN "id",
ADD COLUMN     "message_id" UUID NOT NULL,
ADD CONSTRAINT "messages_pkey" PRIMARY KEY ("message_id");
