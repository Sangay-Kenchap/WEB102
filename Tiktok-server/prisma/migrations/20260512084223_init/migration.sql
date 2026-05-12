/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `avatar` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - The primary key for the `Video` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `audioName` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `caption` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailStoragePath` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailUrl` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `videoStoragePath` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `views` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommentLike` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Follow` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VideoLike` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_videoId_fkey";

-- DropForeignKey
ALTER TABLE "CommentLike" DROP CONSTRAINT "CommentLike_commentId_fkey";

-- DropForeignKey
ALTER TABLE "CommentLike" DROP CONSTRAINT "CommentLike_userId_fkey";

-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_followerId_fkey";

-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_followingId_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_userId_fkey";

-- DropForeignKey
ALTER TABLE "VideoLike" DROP CONSTRAINT "VideoLike_userId_fkey";

-- DropForeignKey
ALTER TABLE "VideoLike" DROP CONSTRAINT "VideoLike_videoId_fkey";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "avatar",
DROP COLUMN "bio",
DROP COLUMN "name",
DROP COLUMN "updatedAt",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "Video" DROP CONSTRAINT "Video_pkey",
DROP COLUMN "audioName",
DROP COLUMN "caption",
DROP COLUMN "thumbnailStoragePath",
DROP COLUMN "thumbnailUrl",
DROP COLUMN "updatedAt",
DROP COLUMN "videoStoragePath",
DROP COLUMN "videoUrl",
DROP COLUMN "views",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Video_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Video_id_seq";

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "CommentLike";

-- DropTable
DROP TABLE "Follow";

-- DropTable
DROP TABLE "VideoLike";

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
