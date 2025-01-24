import express from "express";
import {
    abandon,
    affirmStage,
    booking,
    deleteStage,
    fin_stage,
    getAllStages,
    markviewed_affirmed,
    printed,
    stage_en_cours,
    theme_definitif,
} from "../controller/stagesController.js";
import upload from "../config/multerConfig.js";

const router = express.Router();

router.get("/stage", getAllStages);
router.patch("/stage/viewed", markviewed_affirmed);
router.patch('/stage/printed/:id' , printed)
router.patch("/stage/en_cours", stage_en_cours);
router.patch("/stage/affirm/:id", affirmStage);
router.patch("/stage/abandon/:id", abandon);
router.patch("/stage/theme_defintif/:id", theme_definitif);
router.patch("/stage/fin/:id", fin_stage);
router.patch("/stage/book/:id", upload.fields([{ name: "book" }]), booking);
router.delete("/stage/:id", deleteStage);

export default router;
