import * as express from 'express';
import { getUsers } from '../controller/user.controller';

const userRouter = express.Router();

userRouter.get('/users', getUsers);

export default userRouter;
