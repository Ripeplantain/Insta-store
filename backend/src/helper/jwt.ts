import jwt from 'jsonwebtoken';
import client from './redis';


require('dotenv').config();



const access_secret = process.env.ACCESS_TOKEN_SECRET as string;

export const generateAccessToken = (res: Response, user: any) => {
    const payload = {
        id:user._id,
        email: user.email,
        role: user.role
    }
    const token = jwt.sign(payload, access_secret, {expiresIn: '1h'});
    return token;
}


export const generateRefreshToken = (res: Response, user: any) => {
    const payload = {
        id:user._id,
        email: user.email,
        role: user.role
    }
    const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {expiresIn: '1y'});
    client.set(user._id.toString(), token, 'EX', 365 * 24 * 60 * 60);
    return token;
}

export const verifyRefreshToken = (refreshToken: string) => {
    client.get
    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);
}
