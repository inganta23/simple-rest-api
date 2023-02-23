import express from 'express';
import { createUserSessionHandler, deleteSessionHandler, getUserSessionHandler } from '../controller/session.controller';
import requireUser from '../middleware/requireUser';
import validate from '../middleware/validateResource';
import { createSessionSchema } from '../schema/session.schema';

const router = express.Router();

router.route('/').post(validate(createSessionSchema), createUserSessionHandler).get(requireUser, getUserSessionHandler).delete(requireUser, deleteSessionHandler);

export default router;
