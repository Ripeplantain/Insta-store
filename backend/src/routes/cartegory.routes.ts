import express from 'express';
import { createCategoryController, listCategoriesController, deleteCategoryController } from '../controller/cartegory.controller';
import { verifyAccessToken } from '../middleware/authentication.middleware';



const router = express.Router();

router.post('/api/cartegory', verifyAccessToken, createCategoryController);
router.get('/api/cartegory', listCategoriesController);
router.delete('/api/cartegory/:id', verifyAccessToken, deleteCategoryController);

export default router;