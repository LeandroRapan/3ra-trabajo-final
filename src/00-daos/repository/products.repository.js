import factory from "../factory.js";
const {productsManager} = factory;

export default class productRepository{
    constructor(){
        this.dao=productsManager
    }
    getAllProducts = async ()=>{
    let prod = await this.dao.getAllProducts()
    return prod
}
    getProductById= async(id)=>{
    let prod = await this.dao.getProductById(id);
    
    return prod
}
    createProduct = async(obj)=> {
        let prod = this.dao.createProduct(obj);
        return prod
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


