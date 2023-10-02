import { Router } from "express";
import {
    getAllProductsController,
    getProductByIdController,
    createProductController,
    deleteProductController, 
    updateProductController,
    createProductMockController,
    
   
} from '../02-controllers/products.controllers.js'
import { isAdmin, isOwner } from "../middlewares/authVerification.js";

import  {isPremiumProduct}  from "../middlewares/isPremiumProduct.js";

const router = Router();

//agrege el is owner a las rutas de update y de delete, no se por que lo estaba llamando des
//el controller, cuando compruebe funcionamiento, si anda asi tengo que borrarlo
router.get('/', getAllProductsController); 
router.get('/:id', getProductByIdController);
router.post('/',  createProductController);
router.put('/:id',isAdmin, isOwner, updateProductController);
router.delete('/:id', isAdmin, isPremiumProduct, isOwner, deleteProductController);
router.post('/mockingproducts', createProductMockController)



export default router;