// import ProductsDaoMongoDB from "../00-daos/mongodb/products.dao.js";
import factory from "../00-daos/factory.js"
const { productManager }= factory;
import productRepository from "../00-daos/repository/products.repository.js";
import { generateProducts } from "../test/products.faker.js";
import { productsModel } from "../00-daos/mongodb/models/products.model.js";
const prodDao= new productRepository();

// import ProductsDaoFs from "../daos/filesystem/products.dao.js"
// import { __dirname } from "../path.js";

// const prodDao= new ProductsDaoFs(__dirname+'/daos/filesystem/products.json');

export const getAllService = async (query,page, limit,sort)=>{
    try {
        const docs = await prodDao.getAllProducts(query,page, limit,sort)
        // console.log(docs)
        return docs
    } catch (error) {
        console.log(error)
    }
}
export const getByIdService = async (id)=>{
    try {
        const doc = await prodDao.getProductById(id);
        if(!doc) throw new Error('no encontrado')
        else return doc
    } catch (error) {
        console.log(error)
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
    console.log('antes del productsModelservice:::::::::::::::')
    const productsmok = await productsModel.create(productArray)
    console.log('despues del productsModelservice:::::::::::::::')

    return productsmok
}

// export const agregationProductsService = async(page,limit)=>{
//     try {
//         const agregation = await prodDao.agregationProducts(page,limit);
//         return agregation
//     } catch (error) {
//         console.log(error)
//     }
// }
