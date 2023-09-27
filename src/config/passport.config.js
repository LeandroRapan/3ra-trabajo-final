import UserDao from "../00-daos/mongodb/user.dao.js";
import passport from "passport";
import {Strategy as LocalStrategy} from 'passport-local'

const userDao = new UserDao();

const strategyOptions ={
    usernameField:'email',
    passwordField:'password',
    passReqToCallback: true
};

const signup = async (req, email, password, done) => {
    try {
        const user = await userDao.getByEmail(email);
        if (user) {
            return done(null, false) 
        }
        const newUser= await userDao.createUser(req.body);
        return done(null, newUser)
    } catch (error) {
        console.log(error)        
    }
}



const login =  async (req, email, password,done)=>{
    const user = {email, password};
    const userLogin = await userDao.loginUser(user);
   
    if(!userLogin)return done(null,false);
    return done(null,userLogin)
}


const signStrat = new LocalStrategy(strategyOptions, signup)
const logStrat = new LocalStrategy(strategyOptions, login)

passport.use('register', signStrat);
passport.use('login', logStrat)




passport.serializeUser(async (user,done)=>{
    done(null, user._id);
});
passport.deserializeUser(async(id,done)=>{
    let user =await userDao.getByid(id);
    done(null, user)

})



