import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type TaskInput = {
    content: string;
    userId: number;
};

export async function createTask(input: TaskInput) {
    try {
        const task = await prisma.task.create({
            data: { content: input.content, userId: input.userId }
        });

        return task;
    } catch (error: any) {
        throw new error(error.message);
    }
}

export async function getAllTask(options: any) {
    try {
        const result = await prisma.task.findMany(options);
        return result;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function updateTask(options: any) {
    try {
        const updated = await prisma.task.update(options);
        return updated;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function deleteTask(taskId: number) {
    try {
        const deletedTask = await prisma.task.delete({
            where: {
                id: taskId
            }
        });
        return deletedTask;
    } catch (error: any) {
        throw new Error(error.message);
    }
}
