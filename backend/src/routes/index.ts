import express from 'express';
import authRouter from './auth.routes';
import cartegoryRouter from './cartegory.routes';
import productRouter from './product.routes';
import orderRouter from './order.routes';
import vendorRouter from './vendor.routes';
import fileRouter from './file.routes';


const router = express.Router();

router.use(authRouter);
router.use(cartegoryRouter);
router.use(productRouter);
router.use(orderRouter);
router.use(vendorRouter);
router.use(fileRouter);

export default router;