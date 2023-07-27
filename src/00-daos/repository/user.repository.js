import factory from "../factory.js";
const { userManager } = factory;

export default class userRepository {
constructor() {
    this.dao = userManager
}
createUser= async(user)=>{
   let user =  await this.dao.createUser(user);
   return user
} 
loginUser= async(user)=>{
    let user= this.dao.loginUser(user);
    return user;
}
getByid= async(id)=>{
    let  user= this.dao.getByid(id);
    return user;

}
getByEmail = async(email)=>{
    let user = this.dao.getByEmail(email);
    return user;
}
}