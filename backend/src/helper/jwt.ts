import jwt from 'jsonwebtoken';


require('dotenv').config();


const access_secret = process.env.ACCESS_TOKEN_SECRET as string;

export const generateToken = (res: Response, user: any) => {
    const payload = {
        id:user._id,
        email: user.email,
        role: user.role
    }
    const token = jwt.sign(payload, access_secret, {expiresIn: '1h'});
    return token;
}

