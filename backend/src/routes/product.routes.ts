import express from 'express';
import { verifyAccessToken } from '../middleware/authentication.middleware';
import { createProductController, listOwnerProductsController, listProductsController,
        deleteProductController, updateProductController, getProductController,
        searchProductController} from '../controller/product.controller';


const router = express.Router();

router.post('/api/product', verifyAccessToken, createProductController);
router.get('/api/product', verifyAccessToken, listOwnerProductsController);
router.get('/api/product/all',  listProductsController);
router.delete('/api/product/:id', verifyAccessToken, deleteProductController);
router.put('/api/product/:id', verifyAccessToken, updateProductController);
router.get('/api/product/:id', verifyAccessToken, getProductController);
// router.get('/api/product/search', searchProductController)


export default router;