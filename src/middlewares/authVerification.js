import { userModel } from "../00-daos/mongodb/models/user.model.js";
import passport from "passport";
import { mailDeletedPremiumProduct } from "../utils/Mailer/Mailer.js";
const usrModel = new userModel()
/**
 * comprueba si es admin o premium, a primera vista puede parecer un error, por que habilitaria 
 * a los premium a hacer modificaciones de administrador pero para eso hice otro middleware que viene
 * despues de este "isPremiumProduct"
 * @param {*} req.user.role admin o premium
 
 */
export function isAdmin(req,res,next){
        if(req.isAuthenticated() && req.user.role === 'admin'){
        return next();
    }else if( req.isAuthenticated() && req.user.role==='premium'){
        return next()
    }
    res.status(403).send('acceso denegado')
}
/**
 * esta funcion sirve para que el admin no agregue ni modifique cantidades de productos en el carrito
 * @param {string} req.user.role si es premium o user 
 
 */
export async function isUser(req,res,next){
         if (req.isAuthenticated() && req.user.role =='user'|| req.isAuthenticated() && req.user.role =='premium'){
         return next()
     }
     res.status(403).send("acceso denegado")

    
}
/**
 * @param {string} req req.user._id, prodId.owner tienen que ser iguales
 */
export async function isOwner (req,res, next, prodId){    
    try {
        passport.authenticate('local', { session: true })(req, res, () => {
            if (req.isAuthenticated() && req.user._id.toString() === prodId.owner.toString()) {
                next();
            } else {
                res.status(403).send('Acceso no autorizado');
            }
        });
    } catch (error) {
        console.log(error);
        
    }
}
