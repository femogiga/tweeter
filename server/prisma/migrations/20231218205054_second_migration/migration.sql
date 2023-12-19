/*
  Warnings:

  - You are about to drop the column `personid` on the `Follower` table. All the data in the column will be lost.
  - Added the required column `followerId` to the `Follower` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_personid_fkey";

-- AlterTable
ALTER TABLE "Follower" DROP COLUMN "personid",
ADD COLUMN     "followerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
