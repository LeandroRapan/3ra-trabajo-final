import { getCartsService, getCartByIdServide, createCartService, updateCartService, cartDeleteOneService, updateProductQuantityService, addProductToCartService, generateTktService } from "../01-services/cart.services.js";


export const getCartsController= async(req,res, next)=>{
    try {
        const docs = await getCartsService()
        res.json(docs)
    } catch (error) {
        next(error)
    }
}
/**
 * obtiene el carro por id
 * @param {string} req.params id

 */
export const getCartByIdController = async(req,res, next)=>{
    try {
        const {id}= req.params
        const doc= await getCartByIdServide(id)
        res.json(doc)
    } catch (error) {
        next(error)
    }
}
/**
 * crea el carrito
 * @param {object} req.body en el caso de ya querer sumar un producto al carrito cuando se lo crea
  
 */
export const createCartController= async(req,res, next)=>{
    try {
        const {obj} = req.body
        const newC= await createCartService(obj);
        res.json(newC)

    } catch (error) {
        next(error)
    }
}
/**
 * modifica el carrito
 * @param {string} req.params id
 * @param {object} req.body
 */
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

/**
 * borra del carrito identificado con id el producto con id correspondiente
 * @param {string} req.params id del carrito id del producto 
 * @param {*} res 
 * @param {*} next 
 */
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
/**
 * funcion para modificar la cantidad especifica de productos en el carrito
 * @param {string} req.params id del carrito y del producto
 * @param {*} res 
 * @param {*} next 
 */
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
/**
 * agrega el producto, si ya existe le suma al quantity sino lo pushea 
 * @param {string} req.params id del carrito y id del producto
 */
export const addProductToCartController = async (req, res, next) =>{
    try {
        
        
        const { cid }= req.params;
        const { pid }= req.params
        const addProd = await addProductToCartService(cid, pid);
        res.json(addProd)
    } catch (error) {
        next(error)
        
    }
}

/**
 * revisa la compra, genera errores si no queda suficiente stock del producto, si el carrito esta vacio, o si por algun motivo no encuentra el carrito(este seria el peor de los casos)
 * @param {*} reqparams id del carrito  
 */
export const generateTktController = async(req, res, next)=>{
    try{
        const {cid}= req.params;
        const tkt = await generateTktService(cid);
        res.json(tkt)

    }catch(error){
        next(error)
    }
}