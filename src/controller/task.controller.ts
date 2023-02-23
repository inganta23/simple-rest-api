import { Request, Response } from 'express';
import { createTaskInput, updateTaskInput } from '../schema/task.schema';
import { createTask, deleteTask, getAllTask, updateTask } from '../service/task.service';

export async function createTaskHandler(req: Request<{}, {}, createTaskInput['body']>, res: Response) {
    const userId = Number(res.locals.user.id);
    const body = req.body;
    const task = await createTask({
        ...body,
        userId
    });

    return res.send(task);
}

export async function getAllTaskHandler(req: Request, res: Response) {
    const userId = res.locals.user.id;
    const allTask = await getAllTask({
        where: { userId },
        orderBy: {
            id: 'asc'
        }
    });
    return res.send(allTask);
}

export async function updateTaskHandler(req: Request<updateTaskInput['params'], {}, updateTaskInput['body']>, res: Response) {
    const updated = await updateTask({
        where: { id: Number(req.params.taskId) },
        data: {
            valid: req.body.valid,
            content: req.body.content
        }
    });

    return res.send(updated);
}

export async function deleteTaskHandler(req: Request<updateTaskInput['params'], {}, {}>, res: Response) {
    const deletedTask = await deleteTask(Number(req.params.taskId));
    res.send(deletedTask);
}
