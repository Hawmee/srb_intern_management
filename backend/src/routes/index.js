import express from "express";
import authRouter from './Auth/authRouter.js';
import attestationRouter from './attestationRouter.js';
import demandeRouter from './demandeRouter.js';
import entretientRouter from './entretientRouter.js';
import mailRouter from './mailRouter.js';
import perfRouter from './performanceRouter.js';
import stagesRouter from './stagesRouter.js';
import stagiaireRouter from './stagiaires.Router.js';
import tacheRouter from './tachesRouter.js';
import unitRouter from './unitRouter.js';
import userRouter from './userRouter.js';


const router = express.Router()

router.use('/api' , userRouter)
router.use('/api' , authRouter)
router.use('/api' , attestationRouter)
router.use('/api' , entretientRouter)
router.use('/api' , perfRouter)
router.use('/api' , stagesRouter)
router.use('/api' , stagiaireRouter)
router.use('/api' , tacheRouter)
router.use('/api' , unitRouter)
router.use('/api' , mailRouter )
router.use('/api' , demandeRouter)


export default router