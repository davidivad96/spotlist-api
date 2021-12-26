import { ErrorRequestHandler } from 'express';
import { ValidationError as ExpressValidationError } from 'express-validation';
import { INTERNAL_SERVER_ERROR } from 'http-status';
import { BaseError } from '../utils/errors';
import { errors } from '../utils/constants/errors';
import { createErrorResponse } from '../utils/functions';

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json(createErrorResponse(err.type, err.message));
  }
  if (err instanceof ExpressValidationError) {
    const param = Object.keys(err.details)[0];
    const msg = err.details[param][0].message;
    return res.status(err.statusCode).json(createErrorResponse(errors.validation, msg));
  }
  return res.status(INTERNAL_SERVER_ERROR).json(createErrorResponse(errors.server, err.message));
};

export default errorHandler;
