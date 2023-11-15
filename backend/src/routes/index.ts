import express from 'express';
import authRouter from './auth.routes';
import cartegoryRouter from './cartegory.routes';
import productRouter from './product.routes';


const router = express.Router();

router.use(authRouter);
router.use(cartegoryRouter);
router.use(productRouter);

export default router;