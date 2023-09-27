import {  mailOption2,  Transporter } from "../01-services/email.service.js";

export const sendMailEthereal = async( req,res)=>{
    try {
        const response = await Transporter.sendMail(mailOption2);
        console.log('email enviado');
        res.send(response)
    } catch (error) {
        console.log(error)
        
    }
}

export const sendGmail = async(req,res)=>{
    try {
        const {dest, name} = req.body;
        const gmailOptions ={
            from:process.env.EMAIL,
            to: dest,
            subject: 'bienvenido/a',
            html: `<h1>hola ${name} te damos la bienvenida `
        }
        const response = await Transporter.sendMail(gmailOptions);
        console.log('email enviado')
        res.json(response)
    } catch (error) {
        console.log(error)
    }
}