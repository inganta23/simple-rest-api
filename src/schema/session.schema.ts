import { object, string, TypeOf } from 'zod';

export const createSessionSchema = object({
    body: object({
        email: string({
            required_error: 'email is required'
        }).email('Not valid email'),
        password: string({
            required_error: 'password is required'
        }).min(6, 'Password should be 6 chars minimum')
    })
});

export type createSessionInput = TypeOf<typeof createSessionSchema>;
