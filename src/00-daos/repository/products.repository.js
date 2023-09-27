import factory from "../factory.js";

const {productsManager} = factory;

export default class productRepository{
    constructor(){
        this.dao=productsManager
    }
    getAllProducts = async ()=>{
    let prod = await this.dao.getAllProducts()
    
    
    // let prodDto = prod.docs.map((obj) =>new productResDto(obj)) 
    // return prodDto
    return prod
}
    getProductById= async(id)=>{
    let prod = await this.dao.getProductById(id);
    
    return prod
}
    createProduct = async(obj)=> {
        try {
            let prod = this.dao.createProduct(obj);
        return prod
        } catch (error) {
            throw new Error(error.message)
        }
    }
    updateProduct = async(id,obj)=>{
        let prod= this.dao.updateProduct(id,obj)
        return prod
    }
    deleteProduct= async(id)=>{
        let prod= this.dao.deleteProduct(id);
        return prod
    }
    addProduct
}


