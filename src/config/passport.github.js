import { Strategy as GithubStrategy } from 'passport-github2';
import passport from 'passport';
import UserDao from '../00-daos/mongodb/user.dao.js';
const userDao = new UserDao();

const strategyOptions = {
    clientID: 'Iv1.2d62e41a3b034b25',
    clientSecret: 'bf2e166fb1413cfd662c18607eede9dd95ce0b3c',
    callbackURL: 'http://localhost:8080/users/profile-github'
};

const registerOrLogin = async(accessToken, refreshToken, profile, done) =>{
    console.log('profile:::', profile);
    const email = profile._json.email !== null ? profile._json.email : profile._json.blog;
    const user = await userDao.getByEmail(email);
    if(user) return done(null, user);
    const newUser = await userDao.createUser({
        // first_name: profile._json.name.split(' ')[0],
        // last_name: profile._json.name.split(' ')[1] + ' ' + profile._json.name.split(' ')[2],
        email,
        password: ' ',
        isGithub: true
    });
    return done(null, newUser);
}

passport.use('github', new GithubStrategy(strategyOptions, registerOrLogin));



