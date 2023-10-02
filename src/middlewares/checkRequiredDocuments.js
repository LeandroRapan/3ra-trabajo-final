import path from 'path'
import { __dirname } from "../utils.js";
import fs from 'fs';
import { HttpResponse } from '../utils/http.response.js';

const httpResponse = new HttpResponse()
/**
 * va a buscar los archivos en la carpeta
 * public/id/documents, salta error si la documentacion esta incompleta o si no hay ningun documento
 * especificamente busca: 'identificacion' , 'comprobante de domicilio', 'comprobante de estado de cuenta'
 * los archivos pueden tener una extension (ej: pdf)
* @param {id} req req.params 

 */
export function checkRequiredDocuments(req, res, next){
    const { id }= req.params
    
   
    try {
        const requiredDocuments = ['identificacion' , 'comprobante de domicilio', 'comprobante de estado de cuenta'];
        const userDocumentsPath = path.join(__dirname, `public/${id}/documents`);
        const userDocumentsFiles = fs.readdirSync(userDocumentsPath);
        const documentsTypes = userDocumentsFiles.map(filename=>{
        return path.parse(filename).name;
         
        })
        const checkDocuments = requiredDocuments.filter(doc =>!documentsTypes.includes(doc));       
        if ( checkDocuments.length !== 0){
        return httpResponse.Forbidden(res, 'la documentacion esta incompleta')
           
        } else next()  
    } catch (error) {
        throw new Error('no se ha subido todavia ningun documento')
    }
}

