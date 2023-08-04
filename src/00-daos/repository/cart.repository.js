import factory from "../factory.js";
const{ cartManager}= factory;

export default class cartRepository {
    constructor(){
        this.dao= cartManager
    }
    getCarts = async()=>{
        let cart = this.dao.getCarts();
        return cart
    }
    getCartById = async(id)=>{
        let cart = this.dao.getCartById(id);
        return cart
    }
    createCart = async(obj)=>{
        let cart = this.dao.createCart(obj);
        return cart
    }
    updateCart = async(obj)=>{
        let cart = this.dao.getCarts(obj);
        return cart
    }
    cartDeleteOne = async(cId,prodId)=>{
        let cart = this.dao.cartDeleteOne(cId,prodId);
        return cart
    }
    updateProductQuantity = async(cid,pid, quantity)=>{
        let cart = this.dao.updateProductQuantity(cid,pid,quantity);
        return cart
    }
    addproductToCart = async(cartId, prodId)=>{
        let cart = this.dao.addProductToCart(cartId, prodId);
        return cart
    }
     generateTkt = async(cartId)=>{
        let cart = this.dao.generateTkt(cartId);
        return cart
     }
    
}