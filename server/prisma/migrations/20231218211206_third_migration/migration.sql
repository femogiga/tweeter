/*
  Warnings:

  - Added the required column `personId` to the `Follower` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Follower" ADD COLUMN     "personId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_personId_fkey" FOREIGN KEY ("personId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
