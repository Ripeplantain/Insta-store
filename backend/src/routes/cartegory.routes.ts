import express from 'express';
import { createCategoryController, listCategoriesController, deleteCategoryController } from '../controller/cartegory.controller';
import { verifyAccessToken } from '../middleware/authentication.middleware';



const router = express.Router();

router.post('/cartegory', verifyAccessToken, createCategoryController);
router.get('/cartegory', verifyAccessToken, listCategoriesController);
router.delete('/cartegory/:id', verifyAccessToken, deleteCategoryController);

export default router;