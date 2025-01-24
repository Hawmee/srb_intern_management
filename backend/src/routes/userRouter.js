import express from 'express'
import {  deleteUser, getAllUser, newUser, partialUpdateUser, update_password, validateUser } from "../controller/userControllers.js"


const router = express.Router()

router.get('/users' , getAllUser)
router.post('/users' ,newUser)
router.patch('/user/:id' , validateUser)
router.patch('/user/update/:id' , partialUpdateUser)
router.patch('/user/new_password/:id' , update_password)
router.delete('/user/:id' , deleteUser)

export default router 