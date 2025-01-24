import nodemailer from 'nodemailer'

export const transporter  = nodemailer.createTransport({
    service: 'gmail' ,
    port:'465',
    secure:true,
    auth:{
        user:'nomenaloic.spotify@gmail.com',
        pass:'jyjm sfxn ucie lmvf'
    },
    tls:{
        rejectUnauthorized:true
    }
})