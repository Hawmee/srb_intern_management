/*
  Warnings:

  - Made the column `unite_id` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `unite_id` INTEGER NOT NULL;
