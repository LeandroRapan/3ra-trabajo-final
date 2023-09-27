import ProductsDaoMongoDB from "../00-daos/mongodb/products.dao.js"
import UserDao from "../00-daos/mongodb/user.dao.js";
import { mailDeletedPremiumProduct } from "../utils/Mailer/Mailer.js";


const pModel = new ProductsDaoMongoDB()
const userDao = new UserDao()
export async function isPremiumProduct (req, res, next) {
   const {id} = req.params   
   const product = await pModel.getProductById(id);
     if(product.owner !== 'admin')  {
      const user = await userDao.getByid(product.owner)
      if (user.role== 'premium'){
        console.log('el midleware llega a reconocer que es premium')
         const usrEmail = user.email
          console.log('ahora deberia mandar el email')
         await mailDeletedPremiumProduct(id, usrEmail)
       next()
      }
    next()
   }


}