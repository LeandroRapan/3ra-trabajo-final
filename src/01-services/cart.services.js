import CartDao from "../00-daos/mongodb/Cart.dao.js";

const cDao = new CartDao();
    

export const  getCartsService  = async ()=>{
    try {
        const cartsS= await cDao.getCarts();
        return cartsS
    } catch (error) {
        console.log(error)
    }
};
export const   getCartByIdServide = async (id)=>{
    try {
        const cartS = await cDao.getCartById(id);
        return cartS;        
    } catch (error) {
        console.log(error)
    }
}
export const  createCartService  = async (obj)=>{
    try {
        const newCartS= await cDao.createCart(obj);
        return newCartS;
    } catch (error) {
        console.log(error)
    }
}
export const  updateCartService  = async (id, obj)=>{
    try {
        const updCartS= await cDao.updateCart(id,prod);
        return updCartS;
    } catch (error) {
        console.log(error)
    }
}

export const  cartDeleteOneService = async (cid, pid)=>{
    try {
        const del = await cDao.cartDeleteOne(cid, pid)
        return del;
    } catch (error) {
        console.log(error)   
    }
}

export const  updateProductQuantityService = async (cid, pid, quantity)=>{
    try {
        const udtQ = await cDao.updateProductQuantity(cid,pid, quantity);
        return udtQ;
    } catch (error) {
        
    }
}
export const addProductToCartService = async (cartId, prodId)=>{
    try {
        const prodExist = await prodDao.getProductById(prodId);
        const prodToCart = await prodDao.addProductToCart(cartId, prodId)
        if (!prodExist) {throw new Error('producto no encontrado')}
        else{
            return prodToCart
        }
    } catch (error) {
        console.log(error)
    }

}
