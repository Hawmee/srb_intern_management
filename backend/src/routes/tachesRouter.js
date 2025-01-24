import express from 'express'
import { deleteTache, finished, getAllTache, newTache, partialUpdateTache, undone_tasks, unfinished_tasks } from '../controller/tachesController.js'


const router = express.Router()

router.get('/tache' , getAllTache )
router.post('/tache' , newTache)
router.patch('/tache/undone/:id' , undone_tasks)
router.patch('/tache/validate/:id' , finished)
router.patch('/tache/:id' , partialUpdateTache)
router.delete('/tache/:id' , deleteTache)

router.patch('/taches/unfinished/' , unfinished_tasks)

export default router 