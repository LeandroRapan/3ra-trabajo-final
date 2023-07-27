import passport from "passport";

export function isAdmin(req,res,next){
    if(req.isAuthenticated() && req.user.role === 'admin'){
        return next();
    }
    res.status(403).send('acceso denegado')
}
export function isUser(req,res,next){
    if (req.isAuthenticated() && req.user.role ==='user'){
        return next()
    }
    res.status(403).send("acceso denegado... vos como admin que haces aca? loco")
}