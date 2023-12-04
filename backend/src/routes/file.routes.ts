import express from 'express';
import { uploadFileController } from '../controller/file.controller';
import { verifyAccessToken } from '../middleware/authentication.middleware';
import { upload } from '../middleware/multer.middleware';


const router = express.Router();

router.post('/api/file', verifyAccessToken, upload.single('file') , uploadFileController);

export default router;