import { Router } from 'express'
 import passport from 'passport'
 import {createUserMockController, getAllUsersController, userRegisterController , 
    userLoginController, logoutController,
    githubResponse, changeRole, deleteInactiveController, uploadFileController
 } from '../02-controllers/users.controllers.js'
import { isUser } from '../middlewares/authVerification.js'
import { upload } from '../middlewares/documentsMulter.js'
import { checkRequiredDocuments } from '../middlewares/checkRequiredDocuments.js'


const router = Router()
router.get('/', getAllUsersController)
router.post('/register', passport.authenticate('register'), userRegisterController)
router.post('/login', passport.authenticate('login'), userLoginController)
router.post('/logout', logoutController)
router.get('/register-github', passport.authenticate('github', {scope:['user:email']}));
router.get('/profile-github', passport.authenticate('github', {scope:['user:email']}), githubResponse)
router.patch('/premium/:id',checkRequiredDocuments, changeRole)
router.post('/:id/documents', upload.single('file'), uploadFileController)
 router.delete('/', deleteInactiveController)
 router.post('/mockingusers', createUserMockController)

export default router