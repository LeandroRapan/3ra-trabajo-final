import { cartModel } from "./models/Cart.model.js";
import { productsModel } from "./models/products.model.js";
export default class CartDao {
  async getCarts() {
    try {
      const carts = await cartModel.find();
      return carts;
    } catch (error) {
      throw new Error("error obteniendo carritos");
    }
  }

  async getCartById(id) {
    try {
      const cart = await cartModel.findById(id);
      return cart;
    } catch (error) {
      throw new Error("error obteniendo carrito por id");
    }
  }
  async createCart(obj) {
    try {
      const newCart = await cartModel.create(obj);
      return newCart;
    } catch (error) {
      console.log(error);
      throw new Error("No se pudo crear el carrito");
    }
  }

  async updateCart(id, obj) {
    try {
      const updCart = await cartModel.findByIdAndUpdate(id, obj);

      return updCart;
    } catch (error) {
      throw error;
    }
  }

  async cartDeleteOne(cId, prodId) {
    try {
      const cart = await cartModel.findById(cId);

      if (!cart) throw new Error("carro que?");
      const prodInCart = cart.products.findIndex((p) => p === prodId);
      cart.products.splice(prodInCart, 1);

      await cart.save();
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async updateProductQuantity(cid, pid, quantity) {
    try {
      const cart = await cartModel.findById(cid);
      if (!cart) throw new Error("DAO: ni idea del carro ese");
      console.log(pid);
      const productInCart = cart.products.find((p) => p._id == pid);
      if (!productInCart)
        throw new Error("DAO: encontré el carrito pero eso no estaba");
      const upProd = await productsModel.updateProduct(pid, { quantity });
      if (!upProd) throw new Error("cuantos eran?");
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(cartId, prodId) {
    try {
      const cart = await cartModel.findById(cartId);
      const existingProduct = cart.products.find((product) =>
        product.id.equals(prodId)
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.products.push({ id: prodId });
      }

      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async generateTkt(cid) {
    try {
      
      
      const cart = await cartModel.findById(cid);
      if (!cart) {
        throw new Error("carrito no encontrado.");
      }

      const prodInCart = cart.products;
      
      if(prodInCart.length=== 0){
        const error = new Error('El carrito está vacío');
        error.statusCode = 400;
        throw error;
      }
      const tktProductIds = [];
      let totalPrice = 0;
     
      for (const products of prodInCart) {
        const prodId = products.id;
        const prodQ = products.quantity;
        const prod = await productsModel.findById(prodId);
        if (!prod) {
          throw new Error(`Producto o carrito no encontrado.n°:${prodId}`);
        }

        if (prod.quantity >= 1) {
          prod.quantity -= 1;
          await prod.save();
          tktProductIds.push(prodId);
          totalPrice += prod.price;
        } else {
          throw new Error(
            "No hay suficiente stock disponible para generar el ticket de compra."
          );
        }

        const indexToRemove = cart.products.findIndex(product => product.id === prodId);

        if (indexToRemove !== -1) {
           
            cart.products.splice(indexToRemove, 1);
        }
        await cart.save();
        const tkt = {
          productIds: tktProductIds,
          cantidad: prodQ,
          precioTotal: totalPrice,
        };

        return tkt;
      }
    } catch (error) {
      console.log("Error al generar el ticket de compra:", error);
      throw error;
    }
  }

  //fin de clase
}
