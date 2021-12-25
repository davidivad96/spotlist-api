import * as express from 'express';
import * as cors from 'cors';
import userRouter from './routes/user.route';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(cors());

app.use(userRouter);

app.use(errorHandler);

export default app;
