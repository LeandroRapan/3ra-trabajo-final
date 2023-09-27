import { createHash, isValidPass } from '../../utils.js';
import { userModel } from './models/user.model.js'
import { generateUsr } from '../../test/usr.faker.js';

export default class UserDao {
  async getAllUsers() {
    try {
      const getAllUsr = await userModel.find({});
      return getAllUsr
    } catch (error) {
      throw new Error(error.message)
    }
  }
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
      
       throw new Error(error.message)
    }
  }

  async loginUser(user){
    try {
       const { email, password } = user;
      const userExist = await this.getByEmail(email);
      
      
      if(userExist){
      
        const validatePass= isValidPass( userExist, password);
        
        if(!validatePass) return false 
        else return userExist
      } else {
        return null
      }
    } catch (error) {
      
      throw new Error(error.message)
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
      throw new Error(error.message)
    }
  }
  async deleteInactive(){
    try {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      const users = await userModel.find();
      const inactiveUsers = users.filter(usr=> usr.last_connection < twoDaysAgo);    
      const inactiveUserIds = inactiveUsers.map((usr) => usr._id);
      await userModel.deleteMany({_id: { $in: inactiveUserIds}})
      return inactiveUsers

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async createUserMockDao(quantity=10){
    try {
     const userArray = [];
     for (let i=0; i < quantity; i++){
      const usrs = generateUsr();
      usrs.password =  createHash(usrs.password);
      userArray.push(usrs)
     }
      
    const usrsMok = await userModel.create(userArray);
    return usrsMok

    } catch (error) {
      throw new Error(error.message)
    }
  }
}