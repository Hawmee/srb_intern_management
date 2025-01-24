import express from 'express'
import { informFinalisation, informIntern } from '../controller/mailController.js'


const router = express.Router()


router.post('/informStagiaire' , informIntern )
router.post('/informFinalisation' , informFinalisation )

export default router