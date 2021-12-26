import { Router } from 'express';
import { validate } from 'express-validation';
import { getUsers, createUser } from '../controllers/user.controller';
import { tryCatchWrapper } from '../utils/tryCatchWrapper';
import { userCreateValidation } from '../utils/validation';

const userRouter = Router()
  .get('/users', tryCatchWrapper(getUsers))
  .post('/users', validate(userCreateValidation), tryCatchWrapper(createUser));

export default userRouter;
