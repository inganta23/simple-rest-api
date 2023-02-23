import express from 'express';
import { createUser, getCurrentUser } from '../controller/user.controller';
import requireUser from '../middleware/requireUser';
import validate from '../middleware/validateResource';
import { createUserSchema } from '../schema/user.schema';

const router = express.Router();

router.route('/').post(validate(createUserSchema), createUser);
router.route('/me').get(requireUser, getCurrentUser);

export default router;
