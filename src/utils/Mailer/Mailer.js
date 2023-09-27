import { createTransport } from "nodemailer";
import dontenv from "dotenv";
import { templateHTML } from "./newMessage.js";
dontenv.config()
export const Transporter = createTransport({
    service: 'gmail',
    host: process.env.HOST,
    port: 465,
    secure:true,
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASS
    }

})
export const mailDeletedUsers= async(inactiveUsers)=>{
    
    const mailOptions ={
    from: process.env.EMAIL,
    subject: '2Cuenta eliminada por inactividad',
    text: 'Tu cuenta ha sido eliminada por inactividad.',
     }
     try {
         for (const user of inactiveUsers){
            mailOptions.to = user.email;
         await Transporter.sendMail(mailOptions);
         }
     } catch (error) {
        console.log(error)
     }

     
}
export const mailDeletedPremiumProduct= async(prodId, usrEmail)=>{
    
    const mailOptions ={
    from: process.env.EMAIL,
    to: usrEmail,
    subject: 'Producto eliminado',
    text: `el producto con id ${prodId} a sido eliminado`,
    html: templateHTML,
    attachments: [
        {
            path: process.cwd()+ '/src/01-services/texto.txt',
            filename: 'producto-eliminado'
        }
    ]
     }
     try {
         console.log('llego al mailer')
         console.log(usrEmail + ' usrEmail en el mailer')
         await Transporter.sendMail(mailOptions);
         
     } catch (error) {
        console.log(error)
     }

     
}


