import { Router } from 'express'
 import passport from 'passport'
 import { userRegisterController , 
    userLoginController, logoutController,
    githubResponse, changeRole
 } from '../02-controllers/users.controllers.js'
import { isUser } from '../middlewares/authVerification.js'
import { upload } from '../middlewares/documentsMulter.js'

 const router = Router()

router.post('/register', passport.authenticate('register'), userRegisterController)
router.post('/login', passport.authenticate('login'), userLoginController)
router.post('/logout', logoutController)
router.get('/register-github', passport.authenticate('github', {scope:['user:email']}));
router.get('/profile-github', passport.authenticate('github', {scope:['user:email']}), githubResponse)
router.patch('/premium/:id', changeRole)
router.post('/:id/documents', upload.single('file'), (req,res)=>{
  
   res.status(200).send('archivo cargado exitosamente')

} )

export default router