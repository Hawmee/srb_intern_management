/*
  Warnings:

  - A unique constraint covering the columns `[nom]` on the table `Unites` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Unites_nom_key` ON `Unites`(`nom`);
