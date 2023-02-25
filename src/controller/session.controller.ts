import { CookieOptions, Request, Response } from 'express';
import { createSession, findManySessionService, updateSessionService } from '../service/session.service';
import { validatePassword } from '../service/user.service';
import { signJwt } from '../utils/jwt.utils';
import dotenv from 'dotenv';
import { createSessionInput } from '../schema/session.schema';

dotenv.config();

const accessTokenCookieOptions: CookieOptions = {
    maxAge: 900000, // 15 mins
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: false
};

const refreshTokenCookieOptions: CookieOptions = {
    ...accessTokenCookieOptions,
    maxAge: 3.154e10 // 1 year
};

export async function createUserSessionHandler(req: Request<{}, {}, createSessionInput['body']>, res: Response) {
    const user = await validatePassword(req.body);

    if (!user) {
        return res.status(401).send('Invalid email or password');
    }

    const session = await createSession(user.id, req.get('user-agent') || '');

    const accessToken = signJwt(
        {
            ...user,
            session: session.id
        },
        {
            expiresIn: process.env.ACCESS_TOKEN_TIME
        }
    );

    const refreshToken = signJwt(
        {
            ...user,
            session: session.id
        },
        {
            expiresIn: process.env.REFRESH_TOKEN_TIME
        }
    );

    res.cookie('accessToken', accessToken, accessTokenCookieOptions);

    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

    return res.send({
        accessToken,
        refreshToken
    });
}

export async function getUserSessionHandler(req: Request, res: Response) {
    const userId = res.locals.user.id;
    const session = await findManySessionService({
        where: { userId }
    });

    return res.send(session);
}

export async function deleteSessionHandler(req: Request, res: Response) {
    const sessionId = res.locals.user.session;
    await updateSessionService({
        where: { id: sessionId },
        data: { valid: false }
    });
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.send({
        accessToken: null,
        refreshToken: null
    });
}
