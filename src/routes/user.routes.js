import { Router } from 'express'
 import passport from 'passport'
 import { userRegisterController , 
    userLoginController,
    githubResponse
 } from '../02-controllers/users.controllers.js'

 const router = Router()

router.post('/register', passport.authenticate('register'), userRegisterController)
router.post('/login', passport.authenticate('login'), userLoginController)
router.get('/register-github', passport.authenticate('github', {scope:['user:email']}));
router.get('/profile-github', passport.authenticate('github', {scope:['user:email']}), githubResponse)

export default router