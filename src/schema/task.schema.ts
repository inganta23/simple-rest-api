import { omit } from 'lodash';
import { boolean, object, optional, string, TypeOf } from 'zod';

const payload = {
    body: object({
        content: string({
            required_error: 'Content is required'
        }),
        valid: boolean().optional()
    })
};

const params = {
    params: object({
        taskId: string({
            required_error: 'task _id is required'
        })
    })
};

export const createTaskSchema = object({
    ...payload
});

export const deleteTaskSchema = object({
    ...params
});

export const updateTaskSchema = object({
    ...payload,
    ...params
});

export type createTaskInput = TypeOf<typeof createTaskSchema>;
export type deleteTaskInput = TypeOf<typeof deleteTaskSchema>;
export type updateTaskInput = TypeOf<typeof updateTaskSchema>;
