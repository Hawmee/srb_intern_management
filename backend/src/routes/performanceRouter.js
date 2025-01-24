import express from 'express'
import { deletePerf, getAllPerf, newPerf, partialUpdatePerf } from '../controller/performanceConroller.js'


const router = express.Router()

router.get('/perf' , getAllPerf )
router.post('/perf' , newPerf)
router.patch('/perf/:id' , partialUpdatePerf)
router.delete('/perf/:id' , deletePerf)

export default router 