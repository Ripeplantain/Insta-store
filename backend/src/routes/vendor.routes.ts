import express from 'express';
import { verifyAccessToken } from '../middleware/authentication.middleware';
import { createVendorController, listVendorsController, deleteVendorController, 
        updateVendorController, getVendorController } from '../controller/vendor.controller';



const router = express.Router();

router.post('/api/vendor', verifyAccessToken, createVendorController);
router.get('/api/vendor', verifyAccessToken, listVendorsController);
router.delete('/api/vendor/:id', verifyAccessToken, deleteVendorController);
router.put('/api/vendor/:id', verifyAccessToken, updateVendorController);
router.get('/api/vendor/:id', verifyAccessToken, getVendorController);


export default router;