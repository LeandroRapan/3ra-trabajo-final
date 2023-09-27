import { userModel } from "../00-daos/mongodb/models/user.model.js";
import passport from "passport";
import { mailDeletedPremiumProduct } from "../utils/Mailer/Mailer.js";
const usrModel = new userModel()

export function isAdmin(req,res,next){
        if(req.isAuthenticated() && req.user.role === 'admin'){
        return next();
    }else if( req.isAuthenticated() && req.user.role==='premium'){
        return next()
    }
    res.status(403).send('acceso denegado')
}
export async function isUser(req,res,next){
         if (req.isAuthenticated() && req.user.role =='user'){
         return next()
     }
     res.status(403).send("acceso denegado")

    
}

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
