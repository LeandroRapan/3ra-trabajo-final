
import factory from "../00-daos/factory.js"
const { productManager }= factory;
import productRepository from "../00-daos/repository/products.repository.js";
import { generateProducts } from "../test/products.faker.js";
import { productsModel } from "../00-daos/mongodb/models/products.model.js";
const prodDao= new productRepository();



export const getAllService = async (query,page, limit,sort)=>{
    try {
        const docs = await prodDao.getAllProducts(query,page, limit,sort)
        
        return docs
    } catch (error) {
        throw new Error(error.message)
    }
}
export const getByIdService = async (id)=>{
    try {
        const doc = await prodDao.getProductById(id);
        if(!doc) throw new Error('no encontrado')
        else return doc
    } catch (error) {
        throw new Error(error.message)
    }
}
export const createService = async (obj)=>{
    try {
        const newProd = await prodDao.createProduct(obj);
        console.log(':::::::createservice')
        if(!newProd) throw new Error('error de validacion')
        
        else return newProd
    } catch (error) {
        throw new Error (error.messagge)
    }
}
export const updateService = async (id, obj)=>{
    try {
        const doc = await prodDao.getProductById(id);
        if (!doc){
            throw new Error ('producto no encontrado')
        } else {
            const prodUpt = await prodDao.updateProduct(id,obj)
            return prodUpt;
        }

    } catch (error) {
        throw new Error(error.message)
    }
}
export const deleteService = async (id)=>{
    try {
        const prodDel = await prodDao.deleteProduct(id)
        return prodDel
    } catch (error) {
        throw new Error(error.message)
    }

}
export const createProductMock =async (quantity=50)=>{
    const productArray=[];
    for (let i=0;i<quantity;i++ ){
        const product = generateProducts();
        productArray.push(product)
    };
    
    const productsmok = await productsModel.create(productArray)
   

    return productsmok
}

