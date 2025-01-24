import express from 'express'
import { collected, deleteAttestation, getAllAttestation, inform, newAttestation, partialUpdateAttestation, validate } from '../controller/attestationController.js'



const router = express.Router()

router.get('/attestation' , getAllAttestation )
router.post('/attestation' ,newAttestation)
router.patch('/attestation/:id' , partialUpdateAttestation)
router.patch('/attestation/validate/:id' , validate)
router.patch('/attetation/inform/:id' , inform)
router.patch('/attestation/collected/:id' , collected)
router.delete('/attestation/:id' , deleteAttestation)

export default router 