import supertest from 'supertest';
import { verifyJwt } from '../utils/jwt.utils';
import createServer from '../utils/server';

const app = createServer();

const userInput = {
    email: 'jane@example.com',
    name: 'jane',
    password: '123456'
};

const sessionInput = {
    email: 'jane@example.com',
    password: '123456'
};

export const userPayload = {
    id: 1,
    email: 'jane@example.com',
    name: 'jane'
};

// interface Decoded {
//     id: number;
//     email: string;
//     name: string;
//     session: number;
//     iat: number;
//     exp: number;
// }

let accessToken: string;

describe('user test', () => {
    describe('given email, name, and password are valid (register)', () => {
        it('should return user payload', async () => {
            const { statusCode, body } = await supertest(app).post('/api/user').send(userInput);
            expect(statusCode).toBe(200);
            expect(body).toEqual({
                id: expect.any(Number),
                email: userPayload.email,
                name: userPayload.name
            });
        });
    });

    describe('given email and password correct', () => {
        it('should return accessToken and refreshToken (login)', async () => {
            const { statusCode, body } = await supertest(app).post('/api/session').send(sessionInput);
            accessToken = body['accessToken'];
            const { decoded } = verifyJwt(body['accessToken']);
            expect(statusCode).toBe(200);
            expect(body).toEqual({
                accessToken: expect.any(String),
                refreshToken: expect.any(String)
            });
            //@ts-ignore
            expect(decoded['email']).toEqual(sessionInput['email']);
        });
    });

    describe('given user logged in and acess profile', () => {
        it('should return 200 and send user', async () => {
            const { statusCode, body } = await supertest(app).get('/api/user/me').set('Authorization', `Bearer ${accessToken}`);

            expect(statusCode).toBe(200);
            expect(body).toEqual({
                id: expect.any(Number),
                email: expect.any(String),
                name: expect.any(String),
                session: expect.any(Number),
                iat: expect.any(Number),
                exp: expect.any(Number)
            });
            expect(body['email']).toEqual(sessionInput['email']);
        });
    });
});
