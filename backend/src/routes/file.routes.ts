import express from 'express';
import { uploadFileController } from '../controller/file.controller';
import { verifyAccessToken } from '../middleware/authentication.middleware';


const router = express.Router();

router.post('/api/file', verifyAccessToken, uploadFileController);

export default router;