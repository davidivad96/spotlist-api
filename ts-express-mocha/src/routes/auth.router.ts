import { Router } from 'express';
import { validate } from 'express-validation';
import { authUser } from '../controllers/auth.controller';
import { tryCatchWrapper } from '../utils/tryCatchWrapper';
import { loginValidation } from '../utils/validation';

const authRouter = Router().post('/login', validate(loginValidation), tryCatchWrapper(authUser));

export default authRouter;
