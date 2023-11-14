import express from 'express';
import { registerUser, loginUser, refreshToken, logoutUser } from '../controller/auth.controller';


const router = express.Router();


router.post('/api/register', registerUser);
router.post('/api/login', loginUser);
router.post('/api/refresh-token', refreshToken);
router.post('/api/logout', logoutUser);

export default router;