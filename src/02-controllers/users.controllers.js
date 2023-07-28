
import UserDao from "../00-daos/mongodb/user.dao.js"
const userDao = new UserDao();


export const userRegisterController = async (req, res) => {
    try {      
          res.json({
            msg: 'registro correcto',
            session: req.session
          })
      
    } catch (error) {
      console.log(error);
    }
  }

  export const userLoginController = async (req, res) => {
    try {
        
    
        const user = await userDao.getByid(req.session.passport.user);
        
        const {first_name,last_name, email, age, role}= user;
        req.user= user
        console.log("requsercontroller:::" ,req.user)
        res.json({
            msg:'Login correcto',
            session: req.session,
        userData: {
            first_name,
            last_name,
            email,
            age,
            role
        }        })
    } catch (error) {
      console.log(error);
    }
}

export const githubResponse = async (req,res,next)=>{
    try {
        const{first_name, last_name, email, role, isGithub}= req.user;
        res.json({
            msg:'registro/login github ok',
            session: req.session,
            userData:{
                first_name,
                last_name,
                email,
                role,
                isGithub
            }
        })
    } catch (error) {
        next(error)
    }
}