
import express  from "express";
import routes from './routes/index.js'
import jsonwebtoken from "jsonwebtoken";
import dotenv from 'dotenv'
import http from 'http'
import cors from 'cors'
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from 'express-session'
import { Server } from "socket.io";

dotenv.config()

const parameter = {
    origin : process.env.FRONT_END_URl? process.env.FRONT_END_URl.split(',') : [] ,
    methods : ['GET' , 'POST' , 'PUT' , 'DELETE' , 'PATCH'],
    credentials : true
}

const app = express()
const server = http.createServer(app)
const io = new Server(server , {
    cors:parameter ,
})
const attachsocket = (req,res,next)=>{
    req.io =io 
    next()
}


app.use(cors(parameter))
app.use(attachsocket)
app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
    key:"userCookie",
    secret: "secret_secret",
    resave: false ,
    saveUninitialized: false,
    cookie:{
        maxAge: 24 * 60 * 60 * 1000,
    }
}))


app.use(routes)

server.listen(3000 , ()=>{
    console.log('hello from 3000');
    
})