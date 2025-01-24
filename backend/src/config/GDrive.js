import { google } from 'googleapis'
import { fileURLToPath } from 'url'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const FOLDER_ID = process.env.GOOGLE_FOLDER_ID

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

const auth = new google.auth.GoogleAuth({
    credentials:{
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY
    },
    scopes:SCOPES,
})

const drive = google.drive({version:"v3" , auth})

export {drive , FOLDER_ID}