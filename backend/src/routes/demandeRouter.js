import express from 'express'
import upload from '../config/multerConfig.js'
import { create, deleteDemande, get, markAllViewed, registered, update } from '../controller/demandeController.js'


const router = express.Router()


router.get('/demande' , get )
router.post('/demande' , upload.fields([{name:'cv_link'},{name:'lm_link'}]) ,create)
router.patch('/demande/viewed' , markAllViewed)
router.patch('/demande/registered/:id' , registered     )
router.patch('/demande/:id' , upload.fields([{name:'cv_lien'},{name:'lm_lien'}]), update)
router.delete('/demande/:id' , deleteDemande)

export default router 