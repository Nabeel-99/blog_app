/*
  Warnings:

  - You are about to drop the column `category` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "category";

-- CreateTable
CREATE TABLE "PostCategory" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "PostCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PostCategory_category_idx" ON "PostCategory"("category");

-- AddForeignKey
ALTER TABLE "PostCategory" ADD CONSTRAINT "PostCategory_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
