import { Router } from 'express';

const helloWorldRouter = Router().get('/', (_req, res) => res.status(200).json({ data: 'Hello World!' }));

export default helloWorldRouter;
