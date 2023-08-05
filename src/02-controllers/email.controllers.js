import {  mailOption,  Transportter } from "../01-services/email.service.js";

export const sendMailEthereal = async( req,res)=>{
    try {
        const response = await Transportter.sendMail(mailOption);
        console.log('email enviado');
        res.send(response)
    } catch (error) {
        console.log(error)
        
    }
}