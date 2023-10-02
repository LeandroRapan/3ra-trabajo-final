
import UserDao from "../00-daos/mongodb/user.dao.js"
import { HttpResponse } from "../utils/http.response.js";
import passport from "passport";

import userResDto from "../utils/user.res.dto.js";
import { mailDeletedUsers } from "../utils/Mailer/Mailer.js";
const userDao = new UserDao();
const httpResponse = new HttpResponse()
/** busca todos los usuarios en mongo  */
export const getAllUsersController = async (req, res, next) =>{
    try {
        const allUsers = await userDao.getAllUsers();
      
        const dtoed = allUsers.map(usr => new userResDto(usr))
        
        return httpResponse.Ok(res, dtoed)
    } catch (error) {
        next(error)
    }
}
/** solo muestra la respuesta */
export const userRegisterController = async (req, res) => {
    try {      
          res.json({
            msg: 'registro correcto',
            session: req.session
          })
      
    } catch (error) {
     next(error)
    }
  }
/** esta funcion recibe el Id del usuario desde passport
 * genera una nueca last_connection y lo guarda en mongo
 */
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
      next(error);
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
          
                return httpResponse.Ok(res,'Logout exitoso')  });
              }
           }
        
    } catch (error) {
        next(error)
    }
}

export const githubResponse = async (req,res,next)=>{
    try {
        const{first_name, last_name, email, role, isGithub}= req.user;
        user.last_connection = new Date();
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
/** esta funcion utiliza el req.session.passport.user, para comprobar si es premium o user */
export const changeRole = async( req, res, next) =>{
try {
   
    const user = await userDao.getByid(req.session.passport.user)
    if (user.role == "user"){
        user.role='premium' 
         try {
       await user.save()
       
       return httpResponse.Ok(res, 'el usuario ahora es premium')
    } catch (error) {
        next(error)
    }

    }else{
        user.role= 'user'
        try {
            await user.save()
            return httpResponse.Ok(res, 'el usuario ahora es user')
        }catch(error){
            httpResponse.Forbidden(res, 'no se pudo guardar en la base de datos')
        }
    }   
} catch (error) {
   next(error)
}
}
/**
 no utiliza parametros simplemente utilizando las fechas de login de usuarios los borra.
 **/
export const deleteInactiveController = async(req,res,next)=>{
    try {
      const users =await  userDao.deleteInactive()
      
      await mailDeletedUsers(users)
      return httpResponse.Ok(res, 'los usuarios inactivos fueron borrados y los email enviados')
    
    } catch (error) {
        next(error)
    }
    
}
/**
 * 
 *  document_type, serviran para que el tipo de archivo quede registrado en el 
 * usuario de mongo en forma de string. ejemplo estado_cuenta
 
 * @param {document_type} req
  
  
 */
export const uploadFileController = async (req,res,next)=>{

   
    try { const documentType = req.document_type
       
       const {id}= req.params
       const user = await userDao.getByid(id)
       user.documents.push(documentType)
       await user.save()
      
    } catch (error) {
     next(error)  
    }
    return httpResponse.Ok(res, 'archivo cargado con exito')
  
 } 
export const createUserMockController = async (req,res, next) =>{
    const { quantity }= req.query
    try {
        const response = await userDao.createUserMockDao(quantity);
        return httpResponse.Ok(res, 'usuarios Faker creados')
    } catch (error) {
        next(error)
    }
}