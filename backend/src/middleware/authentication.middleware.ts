import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

require('dotenv').config();



export const verifyAccessToken = (req: any, res: Response, next: any) => {
    if(!req.headers['authorization']) {
        return res.status(403).json({
            'message': 'You are not authorized'
        })
    }
    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, payload: any) => {
        if(err){
            if(err.name === 'JsonWebTokenError'){
                return res.status(401).json({
                    'message': 'Token is invalid'
                })
            } else if(err.name === 'TokenExpiredError'){
                return res.status(403).json({
                    'message': 'Access token expired'
                })
            } else {
                return res.status(403).json({
                    'message': 'Token is invalid'
                })
            }
        }
        req.payload = payload
        next()
    })
}