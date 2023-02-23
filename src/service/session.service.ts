import { PrismaClient } from '@prisma/client';
import { get } from 'lodash';
import { signJwt, verifyJwt } from '../utils/jwt.utils';
import { findManyService } from './user.service';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

export async function createSession(userId: number, userAgent: string) {
    const session = await prisma.session.create({
        data: { userId: userId, userAgent }
    });

    return session;
}

export async function findManySessionService(options: any) {
    try {
        const result = await prisma.session.findMany(options);
        return result;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function updateSessionService(options: any) {
    try {
        const updated = await prisma.session.update(options);
        return updated;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function resIssueAccessToken({ refreshToken }: { refreshToken: string }) {
    const { decoded } = verifyJwt(refreshToken);

    if (!decoded || !get(decoded, 'session')) return;

    const session = await findManySessionService({
        where: { id: get(decoded, 'session') }
    });

    if (!session[0] || !session[0].valid) return false;

    const user = await findManyService({
        where: { id: session[0].userId },
        select: {
            id: true,
            name: true,
            email: true
        }
    });

    if (!user[0]) return false;

    const accessToken = signJwt({ ...user[0], session: session[0].id }, { expiresIn: process.env.ACCESS_TOKEN_TIME });

    return accessToken;
}
