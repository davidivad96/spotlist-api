import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import listRouter from './routes/list.router';
import songRouter from './routes/song.router';
import { errorHandler } from './middlewares';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(listRouter);
app.use(songRouter);

app.use(errorHandler);

export default app;
