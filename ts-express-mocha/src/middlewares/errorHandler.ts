import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => res.status(500).send({ error: err });

export default errorHandler;
