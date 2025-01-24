import express from "express";
import { cookie_handling, login, logout, register } from "../../controller/Auth/AuthController.js";

const router = express.Router()

// router.post('/login' , login
router.post('/login' , login)
router.post('/register' , register)
router.post('/logout' , logout)
router.get('/cookie' , cookie_handling)

export default router