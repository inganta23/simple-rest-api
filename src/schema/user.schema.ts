import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
    body: object({
        name: string({
            required_error: 'Name is required'
        }),
        password: string({
            required_error: 'Password is required'
        }).min(6, 'Password should be 6 chars minimum'),
        email: string({
            required_error: 'Email is required'
        }).email('Not valid email')
    })
});

export type createUserInput = TypeOf<typeof createUserSchema>;
