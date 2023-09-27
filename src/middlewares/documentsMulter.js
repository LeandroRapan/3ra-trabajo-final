    import multer from "multer"
    import { __dirname } from "../utils.js"
    import fs from 'fs'
    import path from "path"
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
    
    export  const upload = multer({ storage: storage })

