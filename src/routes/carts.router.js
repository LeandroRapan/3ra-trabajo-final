import { Router } from "express";
import passport from "passport";
import {
    
    getCartByIdController,
    createCartController,
    updateCartController,
    cartdeleteOneController,
    updateProductQuantityController,
    addProductToCartController,
    generateTktController
} from '../02-controllers/carts.controllers.js'


import { isUser } from "../middlewares/authVerification.js";
const router = Router();

// router.get('/', getCartsController);
router.get('/:id', getCartByIdController);
router.post('/', createCartController);

router.delete ('/:cid/products/:pid', cartdeleteOneController)
router.put('/:id', updateCartController);

router.put('/:cid/products/:pid', isUser,updateProductQuantityController);
// router.delete('/:id')

router.post('/:cid/products/:pid', isUser, addProductToCartController);
router.post('/:cid/purchase', generateTktController)
export default router