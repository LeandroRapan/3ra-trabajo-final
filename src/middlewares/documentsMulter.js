    import multer from "multer"
    import { __dirname } from "../utils.js"
    import fs from 'fs'
    import path from "path"
/**
 *  @param {type} req
 * @param {document_type} req
 * los type validos para que la funcion ordene en carpetas los tipos de documentos son:
 * profile, product, document.
 * los document_type por su parte son:
 * identificacion, estado_cuenta, certificado_domicilio
*/


    import { userModel } from "../00-daos/mongodb/models/user.model.js"
    const userMongo = new userModel()



    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            const { type }= req.body;
            const {id} = req.params;
            let uploadPath = `/public/${id}`
            if (type === 'profile') {
                uploadPath = path.join(uploadPath, 'profile');
              } else if (type === 'product') {
                uploadPath = path.join(uploadPath, 'products');
              } else if (type === 'document') {
              
                uploadPath = path.join(uploadPath, 'documents');
              } else {
                return cb(new Error('Tipo de archivo inválido'));
              }
            
            try {
               
                    fs.mkdirSync(__dirname + uploadPath, { recursive: true });
            
            } catch (error) {
            console.log(error) 
            }
           
            
        cb(null,  __dirname +uploadPath )
        },
        filename: function (req, file, cb) {
            const { document_type} = req.body
        const uniqueSuffix = Date.now() + '-' + file.originalname
        try { 
          req.document_type = document_type
             if (document_type === 'identificacion'){
            cb(null, 'identificacion'+ path.extname(file.originalname))
           

        }else if (document_type ==='certificado_domicilio'){
            cb(null, 'comprobante de domicilio'+ path.extname(file.originalname))
          
        }else if (document_type==='estado_cuenta'){
            cb(null, 'comprobante de estado de cuenta'+ path.extname(file.originalname))
           
        }else cb(null,  uniqueSuffix)
        } catch (error) {
            console.log(error)
        }
       
        }
    })

        /**
/**
 * Ordena documentos en carpetas según su tipo y documento_type.
 *
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {string} type - Tipo válido para organizar los documentos (profile, product, document).
 * @param {string} document_type - Tipo de documento (identificacion, estado_cuenta, certificado_domicilio). Es no requerido, solo si se opera sobre un documento.
 */
    export  const upload = multer({ storage: storage })

