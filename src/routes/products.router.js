import { Router } from "express";
import {
    getAllProductsController,
    getProductByIdController,
    createProductController,
    deleteProductController, 
    updateProductController,
    createProductMockController,
    // agregtionProductsController,
   
} from '../02-controllers/products.controllers.js'
import { isAdmin } from "../middlewares/authVerification.js";

const router = Router();
// router.get('/', agregtionProductsController)

router.get('/', getAllProductsController); 
router.get('/:id', getProductByIdController);
router.post('/',  createProductController);
router.put('/:id',isAdmin, updateProductController);
router.delete('/:id', isAdmin,deleteProductController);
router.post('/mockingproducts', createProductMockController)

// isAdmin,

export default router;