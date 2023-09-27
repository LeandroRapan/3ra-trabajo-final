import { cartModel } from "./models/Cart.model.js";
import { productsModel } from "./models/products.model.js";
export default class CartDao {
    
  
    async getCarts(){
        try{    const carts = await cartModel.find();          
                return carts
            
        }catch(error){
            console.log('error obteniendo carritos')

        }
    }

    async getCartById(id){
        try{
            const cart = await cartModel.findById(id);
            return cart
        }catch(error){
           console.log('error obteniendo carrito por id') 
        }
    }
    async createCart(obj){
        try{
            const newCart = await cartModel.create(obj)
          return newCart
         }catch(error){
             console.log(error)
             throw new Error("No se pudo crear el carrito");
         }
    }

    async updateCart (id, obj) {

        try{
            const updCart= await cartModel.findByIdAndUpdate(id, obj)
            
            return updCart
        }catch(error){
        console.log(error)
        }
    }

    async cartDeleteOne (cId, prodId){
        try {
            const cart = await cartModel.findById(cId);
            
            if(!cart) throw new Error ('carro que?')
            const prodInCart =  cart.products.findIndex(p => p === prodId)
            cart.products.splice(prodInCart, 1)
            
            await cart.save()
            return cart



        } catch (error) {
           console.log(error) 
        }
    }

    async updateProductQuantity (cid, pid, quantity){
        try {
            const cart = await cartModel.findById(cid);
            if (!cart) throw new Error ('DAO: ni idea del carro ese');
            console.log(pid)
            const productInCart = cart.products.find(p=> p._id == pid);
            if (!productInCart) throw new Error ('DAO: encontré el carrito pero eso no estaba');
           const upProd = await productsModel.updateProduct(pid, { quantity });
           if(!upProd) throw new Error('cuantos eran?')
           return cart

        } catch (error) {
            console.log(error)
        }
    }


    async addProductToCart(cartId, prodId) {
        try {
          const cart = await cartModel.findById(cartId)
          console.log(cart)
          cart.products.push(prodId)
          await cart.save()
          return cart
        } catch (error) {
          console.log('error')
        }
      }

      async generateTkt(cid) {
        try {
          // const prod = await productsModel.findById(pid);
          console.log('cartDao cid :::::' +cid)
          const cart = await cartModel.findById(cid);
          if ( !cart) {
            throw new Error('Producto o carrito no encontrado.');
          }
          
          
          const prodInCart = cart.products;
          const tktProductIds=[];
          let totalPrice = 0

         for (const pid of prodInCart){
          const prod = await productsModel.findById(pid)
           if (!prod ) {
            throw new Error(`Producto o carrito no encontrado.n°:${pid}`);
          }
          console.log('prod:::::' + prod)
          console.log('prodQuantity::::'+ prod.quantity)
          if (prod.quantity >= 1) {
            prod.quantity -= 1;
            await prod.save();
            tktProductIds.push(pid);
        totalPrice += prod.price;
         }else {
            throw new Error('No hay suficiente stock disponible para generar el ticket de compra.');
          }
          console.log('cart.products::::' + prod)
      
         
      
            cart.products.pull(pid);
            await cart.save();
            const tkt = {
              productIds: tktProductIds,
              cantidad: tktProductIds.length, 
              precioTotal: totalPrice,
            }
      
            return tkt; 
          } 
        } catch (error) {
          console.log('Error al generar el ticket de compra:', error);
          throw error;
        }
      }
    
           

       







    //fin de clase
}
