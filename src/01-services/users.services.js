import UserDao from '../00-daos/mongodb/user.dao.js'

const userDao = new UserDao()
export const userRegisterService =async (newUserData) => {
    try {
        
        const newUser = await userDao.createUser(newUserData)
        if(newUser) {
            // res.redirect('/views')
            return newUser
        } else {
           throw new Error('Error en el service')
        }
        
    } catch (error) {
      console.log(error);
    }
}

export const userLoginService = async (email, password) =>{
    
   try {
     const userlog = await userDao.loginUser(email, password);
     console.log(userlog)
    if(userlog) {
        
        // res.redirect('/views/profile');
        return userlog
    } else {
        // res.redirect('/views/error-login');
       throw new Error ('error en el service')
    }
   } catch (error) {
    console.log(error)
   }
   
}