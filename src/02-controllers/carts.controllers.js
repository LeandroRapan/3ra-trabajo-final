import { getCartsService, getCartByIdServide, createCartService, updateCartService, cartDeleteOneService, updateProductQuantityService } from "../01-services/cart.services.js";


export const getCartsController= async(req,res, next)=>{
    try {
        const docs = await getCartsService()
        res.json(docs)
    } catch (error) {
        next(error)
    }
}
export const getCartByIdController = async(req,res, next)=>{
    try {
        const {id}= req.params
        const doc= await getCartByIdServide(id)
        res.json(doc)
    } catch (error) {
        next(error)
    }
}
export const createCartController= async(req,res, next)=>{
    try {
        const {obj} = req.body
        const newC= await createCartService(obj);
        res.json(newC)

    } catch (error) {
        next(error)
    }
}
export const updateCartController = async(req,res, next)=>{
    try {
        const {id} = req.params;
        const {obj} = req.body;
        const updCart =await updateCartService(id, obj)
        res.json(updCart)
    } catch (error) {
        next(error)
    }
}

export const cartdeleteOneController = async ( req, res, next)=>{
    try {
        const {cid}= req.params;
        const {pid}= req.params;
        const del = await cartDeleteOneService(cid, pid)
        res.json(del)
    } catch (error) {
        next(error)
        
    }
}
export const updateProductQuantityController = async(req, res, next)=>{
    try {
        const {cid} = req.params;
        const {pid} =req.params;
        
        const quantity = req.body;
        const upd= updateProductQuantityService(cid,pid, quantity);
        res.json(upd)

        
    } catch (error) {
        next(error)
        
    }
}
export const addProductToCartController = async (req, res, next) =>{
    try {
        console.log('inicio proceso controller')
        
        const { cid }= req.params;
        const { pid }= req.params
        const addProd = await addProductToCartService(cid, pid);
        res.json(addProd)
    } catch (error) {
        
    }
}