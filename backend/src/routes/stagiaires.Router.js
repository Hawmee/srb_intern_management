import express from 'express'
import { addFilesToStagiaire, createStagiaire, deleteStagiaire, getAllStagiaire, newStagiaire, partialUpdateStagiaire } from '../controller/stagiairesController.js'
import upload from '../config/multerConfig.js'


const router = express.Router()

router.get('/stagiaire' , getAllStagiaire )
router.post('/stagiaire',  createStagiaire)
router.patch('/stagiaire/:id' , upload.fields([{name:'cv_lien'},{name:'lm_lien'}])  , partialUpdateStagiaire)
router.patch('/stagiaire/addDocs/:id' , upload.fields([{name:'cv_link'},{name:'lm_link'}])  , addFilesToStagiaire)
router.delete('/stagiaire/:id' , deleteStagiaire)

export default router 