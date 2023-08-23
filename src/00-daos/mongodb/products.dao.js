import { productsModel } from "./models/products.model.js";

export default class ProductsDaoMongoDB {
 
    async getAllProducts(query,page= 1, limit =10, sort=1) {
        try {
          
          const sortMode ={
            price: sort
          }
          const response = await productsModel.paginate(query?{query}:{}, {page, limit, sort: sortMode});
          
          return response;
          
        } catch (error) {
          throw new Error(error.message);
        }
      }
    
      async getProductById(id) {
        try {
          const response = await productsModel.findById(id);
          return response;
        } catch (error) {
          throw new Error(error.message);
        }
      }
    
      async createProduct(obj) {
        try {
          const response = await productsModel.create(obj);
          return response;
        } catch (error) {
          throw new Error(error.message);
        }
      }
    
      async updateProduct(id, obj) {
        try {
          await productsModel.findByIdAndUpdate({_id: id}, obj);
          
          return await productsModel.findById(id)
        } catch (error) {
          throw new Error(error.message);
        }
      }
    
      async deleteProduct(id) {
        try {
          const response = await productsModel.findByIdAndDelete(id);
          return response;
        } catch (error) {
          throw new Error(error.message);
        }
      }

     
// async agregationProducts(page=1, limit=10) {
// try{
//   const sort = 'des'
//   const sortDirection = sort==='asc'? 1:-1
//   const response = await productsModel.aggregate([
//     {
//       $match:{}
//     },
    
//     {
//       $sort:{
//         price: sortDirection
//       }
      
//     }
//   ])
//   await response.paginate({}, {page, limit})
//   return response;
// }catch(error){
//       console.log(error)
//     }

// }
}

