import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { omit } from 'lodash';

interface userInput {
    name: string;
    email: string;
    hash: string;
}

const prisma = new PrismaClient();

export async function createUserService(input: userInput) {
    try {
        const user = await prisma.user.create({
            data: { name: input.name, email: input.email, password: input.hash }
        });
        return {
            id: user.id,
            email: user.email,
            name: user.name
        };
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function findManyService(options: any) {
    try {
        const result = await prisma.user.findMany(options);
        return result;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function validatePassword({ email, password }: { email: string; password: string }) {
    const user = await findManyService({
        where: { email }
    });

    if (!user[0]) return false;

    const isValid = await bcrypt.compare(password, user[0].password).catch(() => false);

    if (!isValid) return false;
    return omit(user[0], 'password');
}
