import express from 'express'
import { cancelEntretient, createEntretien, deleteEntretient, getAllEntretient, informedEntretien, markViewed, partialUpdateEntretient, validateEntretient } from '../controller/entretientController.js'

const router = express.Router()


router.get('/entretient' , getAllEntretient )
router.post('/entretient' ,createEntretien)
router.patch('/markviewed/entretient' , markViewed)
router.patch('/entretient/informed/:id' , informedEntretien)
router.patch('/entretient/validate/:id' , validateEntretient)
router.patch('/entretient/cancel/:id' , cancelEntretient)
router.patch('/entretient/:id' , partialUpdateEntretient)
router.delete('/entretient/:id' , deleteEntretient)

export default router 