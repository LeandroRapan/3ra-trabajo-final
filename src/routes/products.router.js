import { Router } from "express";
import {
    getAllProductsController,
    getProductByIdController,
    createProductController,
    deleteProductController, 
    updateProductController,
    createProductMockController,
    
   
} from '../02-controllers/products.controllers.js'
import { isAdmin } from "../middlewares/authVerification.js";

import  {isPremiumProduct}  from "../middlewares/isPremiumProduct.js";

const router = Router();


router.get('/', getAllProductsController); 
router.get('/:id', getProductByIdController);
router.post('/',  createProductController);
router.put('/:id',isAdmin, updateProductController);
router.delete('/:id', isAdmin, isPremiumProduct, deleteProductController);
router.post('/mockingproducts', createProductMockController)



export default router;