import express from 'express';
import { createTaskHandler, deleteTaskHandler, getAllTaskHandler, updateTaskHandler } from '../controller/task.controller';
import requireUser from '../middleware/requireUser';
import validate from '../middleware/validateResource';
import { createTaskSchema, deleteTaskSchema, updateTaskSchema } from '../schema/task.schema';

const router = express.Router();

router
    .route('/')
    .get(requireUser, getAllTaskHandler)
    .post([requireUser, validate(createTaskSchema)], createTaskHandler);

router
    .route('/:taskId')
    .put([requireUser, validate(updateTaskSchema)], updateTaskHandler)
    .delete([requireUser, validate(deleteTaskSchema)], deleteTaskHandler);

export default router;
