import { Router } from "express";
import {
    getCartsController,
    getCartByIdController,
    createCartController,
    updateCartController,
    cartdeleteOneController,
    updateProductQuantityController,
    addProductToCartController
} from '../02-controllers/carts.controllers.js'

import passport from "passport";
import { isUser } from "../middlewares/authVerification.js";
const router = Router();

// router.get('/', getCartsController);
router.get('/:id', getCartByIdController);
router.post('/', createCartController);

router.delete ('/:cid/products/:pid', cartdeleteOneController)
router.put('/:id', updateCartController);

router.put('/:cid/products/:pid',passport.authenticate, isUser,updateProductQuantityController);
// router.delete('/:id')

router.post('/:cid/:pid', isUser, addProductToCartController);
router.post('/:cid/purchase')
export default router