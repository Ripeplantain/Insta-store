import { Response, Request } from 'express';
import { createUser, findUserByEmail } from '../service/user.service';
import { userData } from '../helper/validatre';
import { generateToken } from '../helper/jwt';



export const registerUser = async (req: Request, res: any) => {
    const { email, password, ...values } = req.body;
    try {
        userData.parse({ email, password, ...values });
        const oldUser = await findUserByEmail(email);
        if(oldUser) return res.status(400).send('User already exists');
        const user = await createUser({ email, password, ...values });
        const token = generateToken(res, user);
        return res.status(200).send({user, token});
    } catch (error: any) {
        return res.status(500).send(error.message);
    }
}