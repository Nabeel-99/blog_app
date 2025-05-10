-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "isUserDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Reply" ADD COLUMN     "isUserDeleted" BOOLEAN NOT NULL DEFAULT false;
