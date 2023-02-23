import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { createUserService } from '../service/user.service';
import { createUserInput } from '../schema/user.schema';

export async function createUser(req: Request<{}, {}, createUserInput['body']>, res: Response) {
    const { name, email, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = bcrypt.hashSync(password, salt);
        const user = await createUserService({ name, email, hash });
        return res.json(user);
    } catch (error: any) {
        return res.status(409).send(error.message);
    }
}

export async function getCurrentUser(req: Request, res: Response) {
    return res.send(res.locals.user);
}
