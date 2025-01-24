import express from 'express'
import { deleteUnit, getAllUnit, newUnit, partialUpdateUnit } from '../controller/unitController.js'


const router = express.Router()

router.get('/unit' , getAllUnit )
router.post('/unit' , newUnit)
router.patch('/unit/:id' , partialUpdateUnit)
router.delete('/unit/:id' , deleteUnit)

export default router 