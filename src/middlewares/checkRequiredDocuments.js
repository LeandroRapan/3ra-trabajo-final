import path from 'path'
import { __dirname } from "../utils.js";
import fs from 'fs';
export function checkRequiredDocuments(req, res, next){
    const { id }= req.params
    
    // if(!path.join(__dirname, `public/${id}/documents`)){
    //     res.status(403).send('todavia no se adjunto ningun documento')
    // }
    try {
        const requiredDocuments = ['identificacion' , 'comprobante de domicilio', 'comprobante de estado de cuenta'];
        const userDocumentsPath = path.join(__dirname, `public/${id}/documents`);
        const userDocumentsFiles = fs.readdirSync(userDocumentsPath);
        const documentsTypes = userDocumentsFiles.map(filename=>{
        return path.parse(filename).name;
         
        })
        const checkDocuments = requiredDocuments.filter(doc =>!documentsTypes.includes(doc));       
        if ( checkDocuments.length !== 0){
        res.status(403).send('la documentacion esta incompleta')
        } else next()  
    } catch (error) {
        throw new Error('no se ha subido todavia ningun documento')
    }
}

