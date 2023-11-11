import jwt from 'jsonwebtoken';
import logger from './logger';


require('dotenv').config();


const secret = process.env.JWT_SECRET as string;

export const generateToken = (res: Response, user: any) => {
    const token = jwt.sign({id: user._id}, secret, {expiresIn: '1h'});
    return token;
}