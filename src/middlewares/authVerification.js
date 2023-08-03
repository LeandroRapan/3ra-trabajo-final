
import UserDao from "../00-daos/mongodb/user.dao.js";

const userDao=new UserDao()
export function isAdmin(req,res,next){
    // console.log(req.isAuthenticated());
    

    if(req.isAuthenticated() && req.user.role === 'admin'){
        return next();
    }
    res.status(403).send('acceso denegado')
}
export async function isUser(req,res,next){
    // console.log("req session de mdle" ,req.session)
    // console.log("req session pasport user"+req.session.passport)
    // console.log("req user "+ req.user)
    // // const user = await userDao.getByid(req.session.passport.user)
    // req.user=user
    // console.log("reqUser de middle",req.user)
     if (req.isAuthenticated() && req.user.role =='user'){
         return next()
     }
     res.status(403).send("acceso denegado... vos como admin que haces aca? loco")

    console.log('req.session.passport.user' + req.session.passport.user )
}