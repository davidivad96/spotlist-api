import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import helloWorldRouter from './routes/hello-world.router';
import userRouter from './routes/user.router';
import listRouter from './routes/list.router';
import songRouter from './routes/song.router';
import { errorHandler, pageNotFoundHandler } from './middlewares';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helloWorldRouter);
app.use(userRouter);
app.use(listRouter);
app.use(songRouter);

app.use(errorHandler);
app.use(pageNotFoundHandler);

export default app;
