import { Response, Request } from 'express';
import { createUser, findUserByEmail } from '../service/user.service';
import { userData } from '../helper/validatre';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../helper/jwt';
import client from '../helper/redis';


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


// @desc   Refresh token
// @route  POST /api/refresh-token
// @access Public
export const refreshToken = async (req: Request, res: any) => {
    const { refreshToken } = req.body;
    if(!refreshToken) return res.status(403).json({
        'message': 'You are not authorized'
    })
    try {
        const payload: any = verifyRefreshToken(refreshToken);
        const user: any = await findUserByEmail(payload.email);
        if(!user) return res.status(400).send('User does not exist');
        const accessToken = generateAccessToken(res, user);
        return res.status(200).send({accessToken});
    } catch (error: any) {
        return res.status(500).send(error.message);
    }
}


// @desc   Logout user
// @route  POST /api/logout
// @access Public
export const logoutUser = async (req: Request, res: any) => {
    const { refreshToken } = req.body;
    if(!refreshToken) return res.status(403).json({
        'message': 'You are not authorized'
    })
    try {
        const payload: any = verifyRefreshToken(refreshToken);
        const user: any = await findUserByEmail(payload.email);
        if(!user) return res.status(400).send('User does not exist');
        client.del(user._id.toString());
        return res.status(200).send('Logout successful');
    } catch (error: any) {
        return res.status(500).send(error.message);
    }
}