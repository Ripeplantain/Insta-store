import { Response, Request } from 'express';
import { createUser, findUserByEmail } from '../service/user.service';
import { userData } from '../helper/validatre';
import { generateAccessToken, generateRefreshToken } from '../helper/jwt';
import logger from '../helper/logger';


// @desc   Register user
// @route  POST /api/register
// @access Public
export const registerUser = async (req: Request, res: any) => {
    const { email, password, ...values } = req.body;
    try {
        userData.parse({ email, password, ...values });
        const oldUser = await findUserByEmail(email);
        if(oldUser) return res.status(400).send('User already exists');
        const user = await createUser({ email, password, ...values });
        const accessToken = generateAccessToken(res, user);
        const refreshToken = generateRefreshToken(res, user);
        return res.status(200).send({user, accessToken, refreshToken});
    } catch (error: any) {
        return res.status(500).send(error.message);
    }
}


// @desc   Login user
// @route  POST /api/login
// @access Public
export const loginUser = async (req: Request, res: any) => {
    const { email, password } = req.body;
    try {
        const user: any = await findUserByEmail(email);
        logger.info(user)
        if(!user) return res.status(400).send('User does not exist');
        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(400).send('Incorrect password');
        const accessToken = generateAccessToken(res, user);
        const refreshToken = generateRefreshToken(res, user);
        return res.status(200).send({user, accessToken, refreshToken});
    } catch (error: any) {
        return res.status(500).send(error.message);
    }
}