-- RenameIndex
ALTER TABLE `entretients` RENAME INDEX `Entretients_stagiaire_id_fkey` TO `Entretients_stagiaire_id_idx`;

-- RenameIndex
ALTER TABLE `stages` RENAME INDEX `Stages_stagiaire_id_fkey` TO `Stages_stagiaire_id_idx`;

-- RenameIndex
ALTER TABLE `stages` RENAME INDEX `Stages_unite_id_fkey` TO `Stages_unite_id_idx`;

-- RenameIndex
ALTER TABLE `taches` RENAME INDEX `Taches_stage_id_fkey` TO `Taches_stage_id_idx`;

-- RenameIndex
ALTER TABLE `unites` RENAME INDEX `Unites_division_id_fkey` TO `Unites_division_id_idx`;

-- RenameIndex
ALTER TABLE `users` RENAME INDEX `Users_unite_id_fkey` TO `Users_unite_id_idx`;
