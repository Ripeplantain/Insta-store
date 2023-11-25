import express from 'express';
import { verifyAccessToken } from '../middleware/authentication.middleware';
import { createOrderController, listOrdersController, listUserOrdersController,
        getOrderController, updateOrderController, deleteOrderController} from '../controller/order.controller';


const router = express.Router();

router.post('/api/order', verifyAccessToken, createOrderController);
router.get('/api/order', verifyAccessToken, listOrdersController);
router.get('/api/order/user', verifyAccessToken, listUserOrdersController);
router.get('/api/order/:id', verifyAccessToken, getOrderController);
router.put('/api/order/:id', verifyAccessToken, updateOrderController);
router.delete('/api/order/:id', verifyAccessToken, deleteOrderController);


export default router;