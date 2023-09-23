import { createHash, isValidPass } from '../../utils.js';
import { userModel } from './models/user.model.js'

export default class UserDao {
  async createUser(user) {
    try {
      const { email, password, first_name, last_name, age } = user;
      const existUser = await userModel.find({email});
      if(existUser.length === 0){
        if(email === 'adminCoder@coder.com' && password === 'adminCoder123'){
          return await userModel.create({...user, password:createHash(password), role: 'admin'});
        } else {
          const newUser = await userModel.create({...user, password: createHash(password)});
          return newUser
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async loginUser(user){
    try {
       const { email, password } = user;
      const userExist = await this.getByEmail(email);
      // console.log(user.password)
      
      if(userExist){
      
        const validatePass= isValidPass( userExist, password);
        
        if(!validatePass) return false 
        else return userExist
      } else {
        return null
      }
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
  async getByid (id){
    try {
      const userExist = await userModel.findById(id);
      
      if (userExist){
        return userExist
      }return false
    } catch (error) {
      
    }
  }
  async getByEmail(email){
    try {
      const userExist = await userModel.findOne({email});
      if(userExist){
        return userExist
      }return false
    } catch (error) {
      throw new Error(error)
    }
  }
}