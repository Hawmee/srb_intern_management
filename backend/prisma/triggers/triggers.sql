DELIMITER //

CREATE TRIGGER set_isDispo_false_before_Update
BEFORE UPDATE ON Offres
FOR EACH ROW
BEGIN 
    IF NEW.nombre_stagiaire = 0 THEN 
        SET NEW.isDispo = false;
    ELSE
        SET NEW.isDispo = true;
    END IF;
END;
//

CREATE TRIGGER set_isDispo_false_before_Add
BEFORE INSERT ON Offres
FOR EACH ROW
BEGIN 
    IF NEW.nombre_stagiaire = 0 THEN 
        SET NEW.isDispo = false;
    ELSE
        SET NEW.isDispo = true;
    END IF;
END;
//

CREATE TRIGGER set_observation_inachevee
BEFORE INSERT ON Taches
FOR EACH ROW
BEGIN
    IF NEW.date_fin < NOW() THEN
        SET NEW.observation = 'Inachevée';
    ELSE
        SET NEW.observation = 'En cours';
    END IF;
END;
//

CREATE TRIGGER update_observation_inachevee
BEFORE UPDATE ON Taches
FOR EACH ROW
BEGIN
    IF NEW.date_fin < NOW() THEN
        SET NEW.observation = 'Inachevée';
    ELSE
        SET NEW.observation = 'En cours';
    END IF;
END;
//

CREATE TRIGGER increment_stagiaire_on_stage_cancel
AFTER UPDATE ON Stages
FOR EACH ROW
BEGIN
    -- When stage is cancelled, increment nombre_stagiaire by 1
    IF NEW.observation = 'annulé' AND OLD.observation != 'annulé' THEN
        UPDATE Offres 
        SET nombre_stagiaire = nombre_stagiaire + 1
        WHERE id = NEW.offre_id;
    END IF;
END;
//

CREATE TRIGGER increment_stagiaire_on_interview_delete
AFTER DELETE ON Entretients
FOR EACH ROW
BEGIN
    -- When interview is deleted, increment nombre_stagiaire by 1
    UPDATE Offres 
    SET nombre_stagiaire = nombre_stagiaire + 1
    WHERE id = OLD.offre_id;
END;
//

DELIMITER ;
