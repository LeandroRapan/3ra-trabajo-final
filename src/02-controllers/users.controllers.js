
import UserDao from "../00-daos/mongodb/user.dao.js"
import { HttpResponse } from "../utils/http.response.js";
import passport from "passport";
import fs from 'fs'
import path from 'path'
import { __dirname } from "../utils.js";
const userDao = new UserDao();
const httpResponse = new HttpResponse()


export const userRegisterController = async (req, res) => {
    try {      
          res.json({
            msg: 'registro correcto',
            session: req.session
          })
      
    } catch (error) {
      console.log(error);
    }
  }

  export const userLoginController = async (req, res) => {
    try {
        
    
        const user = await userDao.getByid(req.session.passport.user);
           user.last_connection = new Date();
          await user.save()
        
        const {first_name,last_name, email, age, role}= user;
        req.user= user
        
        res.json({
            msg:'Login correcto',
            session: req.session,
        userData: {
            first_name,
            last_name,
            email,
            age,
            role
        }        })
    } catch (error) {
      console.log(error);
    }
}
export const logoutController = async (req, res, next)=>{
    try {
        if(req.isAuthenticated()){
           const user= await userDao.getByid(req.session.passport.user)
           if(user){
            user.last_connection = new Date;
            await user.save()
            req.logout((err) => {
                if (err) {
                  console.error('Error en req.logout():', err);
                  
                }
          
                res.json({ message: 'Logout exitoso' });
              })
           }
        }
    } catch (error) {
        console.log(error)
    }
}

export const githubResponse = async (req,res,next)=>{
    try {
        const{first_name, last_name, email, role, isGithub}= req.user;
        res.json({
            msg:'registro/login github ok',
            session: req.session,
            userData:{
                first_name,
                last_name,
                email,
                role,
                isGithub
            }
        })
    } catch (error) {
        next(error)
    }
}
export const changeRole = async( req, res, next) =>{
try {
    const { id }= req.params
    function checkRequiredDocuments(){
        const { id }= req.params
        const requiredDocuments = ['identificacion' , 'comprobante de domicilio', 'comprobante de estado de cuenta'];
        const userDocumentsPath = path.join(__dirname, `public/${id}/documents`);
        console.log(userDocumentsPath)
        const userDocumentsFiles = fs.readdirSync(userDocumentsPath);
        const documentsTypes = userDocumentsFiles.map(filename=>{
            return path.parse(filename).name;
             
        })
        const checkDocuments = requiredDocuments.filter(doc =>!documentsTypes.includes(doc));
        console.log(checkDocuments)
        console.log(checkDocuments.length)
        console.log(checkDocuments.length == 0)
        return checkDocuments.length == 0



    }
    
    if (checkRequiredDocuments() !== true){
        throw new Error ('la decumentación requerida está incompleta')
    }
    const user = await userDao.getByid(req.session.passport.user)
    if (user.role == "user"){
        user.role='premium' 
         try {
       await user.save()
       
       return httpResponse.Ok(res, 'el usuario ahora es premium')
    } catch (error) {
        console.log(error)
    }

    }else{
        user.role= 'user'
        try {
            await user.save()
            return httpResponse.Ok(res, 'el usuario ahora es user')
        }catch(error){
            console.log(error)
        }
    }

   
   
} catch (error) {
    console.log(error)
}
}