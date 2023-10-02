import { Strategy as GithubStrategy } from 'passport-github2';
import passport from 'passport';
import UserDao from '../00-daos/mongodb/user.dao.js';
import dotenv from 'dotenv'
const userDao = new UserDao();
dotenv.config()
const strategyOptions = {
    clientID: process.env.GIT_STRATEGY_CLIENT_ID,
    clientSecret: process.env.GIT_STRATEGY_CLIENT_SECRET,
    callbackURL: process.env.GIT_STRATEGY_CLIENT_CALLBACK
};

const registerOrLogin = async(accessToken, refreshToken, profile, done) =>{
    // console.log('profile:::', profile);
    try {
        let email = profile._json.email !== null ? profile._json.email : profile._json.blog;
        const user = await userDao.getByEmail(email);
        if(user) return done(null, user);
        let nameGithub = 'nombre faltante'
        if (!email){
            email = 'email@faltante.com'
        }
        if(profile._json.name){
            nameGithub = profile._json.name
        }
        const newUser = await userDao.createUser({
             first_name: nameGithub.split(' ')[0],
             last_name: nameGithub.split(' ')[1],
            email,
            password: ' ',
            isGithub: true
        });
        return done(null, newUser);
    } catch (error) {
        console.log(error)
    }
    
    
    
}

passport.use('github', new GithubStrategy(strategyOptions, registerOrLogin));



