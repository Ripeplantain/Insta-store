import { Response, Request } from 'express';
import { createUser, findUserByEmail } from '../service/user.service';




export const registerUser = async (req: Request, res: Response) => {
    const { email, password, ...values } = req.body;
    try {
        if(!email || !password) return res.status(400).send('Email and password are required');
        const oldUser = await findUserByEmail(email);
        if(oldUser) return res.status(400).send('User already exists');
        const user = await createUser({ email, password, ...values });
        return res.status(200).send(user);
    } catch (error: any) {
        return res.status(500).send(error.message);
    }
}