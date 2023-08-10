import { productsModel } from "./models/products.model.js";

export default class ProductsDaoMongoDB {
 
    async getAllProducts(query,page= 1, limit =10, sort=1) {
        try {
          console.log('aca esta el dao de mongo andando')
          const sortMode ={
            price: sort
          }
          const response = await productsModel.paginate(query?{query}:{}, {page, limit, sort: sortMode});
          
          return response;
          
        } catch (error) {
          console.log(error);
        }
      }
    
      async getProductById(id) {
        try {
          const response = await productsModel.findById(id);
          return response;
        } catch (error) {
          console.log(error);
        }
      }
    
      async createProduct(obj) {
        try {
          const response = await productsModel.create(obj);
          return response;
        } catch (error) {
          console.log(error);
        }
      }
    
      async updateProduct(id, obj) {
        try {
          await productsModel.findByIdAndUpdate({_id: id}, obj);
          return obj;
        } catch (error) {
          console.log(error);
        }
      }
    
      async deleteProduct(id) {
        try {
          const response = await productsModel.findByIdAndDelete(id);
          return response;
        } catch (error) {
          console.log(error);
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

