import express from 'express';
import { verifyAccessToken } from '../middleware/authentication.middleware';
import { createProductController, listOwnerProductsController, listProductsController,
        deleteProductController, updateProductController, getProductController} from '../controller/product.controller';


const router = express.Router();

router.post('/product', verifyAccessToken, createProductController);
router.get('/product', verifyAccessToken, listOwnerProductsController);
router.get('/product/all', verifyAccessToken, listProductsController);
router.delete('/product/:id', verifyAccessToken, deleteProductController);
router.put('/product/:id', verifyAccessToken, updateProductController);
router.get('/product/:id', verifyAccessToken, getProductController);


export default router;