import { userModel } from "../00-daos/mongodb/models/user.model.js";
import passport from "passport";
const usrModel = new userModel()
export function isAdmin(req,res,next){
        if(req.isAuthenticated() && req.user.role === 'admin'){
        return next();
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
//     console.log('llego a la auth!!!!!!!!!!')
// try {
//      if(  req.isAuthenticated() && req.user._id == prodId.owner){
      
//         console.log("paso la comprobacion!!!!!!!")
//         next()
//     } 
//     usrid == prodId.owner
// } catch (error) {
//     console.log(error)
// }

    console.groupCollapsed('¡Llegó a la autenticación!');
    
    try {
        // console.log('console log del req:::::'+req);
        // if (req.user && req.user._id.toString() === prodId.owner.toString()) {
        //     console.log('¡Pasó la comprobación de propietario!');
        //     next();
        // } else {
        //     console.log('El usuario no es el propietario del producto o no está autenticado.');
        //     // Realiza alguna acción en caso de que el usuario no sea el propietario o no esté autenticado
        // }
        passport.authenticate('local', { session: true })(req, res, () => {
            if (req.isAuthenticated() && req.user._id.toString() === prodId.owner.toString()) {
                console.log('El usuario es el propietario del producto. Acceso permitido.');
                next();
            } else {
                console.log('El usuario no es el propietario del producto o no está autenticado.');
                res.status(403).send('Acceso no autorizado');
            }
        });
    } catch (error) {
        console.log(error);
        // Realiza alguna acción en caso de un error
    }
}
    // console.log('authverification user id:::::::' + req.user._id)
    // console.log(req.isAuthenticated() + req.user )  
   
//  }