/*
  Warnings:

  - A unique constraint covering the columns `[personId,followerId]` on the table `Follower` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Follower_personId_followerId_key" ON "Follower"("personId", "followerId");
