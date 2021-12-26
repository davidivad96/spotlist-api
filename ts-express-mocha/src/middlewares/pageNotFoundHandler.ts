import { RequestHandler } from 'express';
import { NOT_FOUND } from 'http-status';
import { errors } from '../utils/constants/errors';
import { createErrorResponse } from '../utils/functions';

const pageNotFoundHandler: RequestHandler = (_req, res) =>
  res.status(NOT_FOUND).json(createErrorResponse(errors.not_found, 'Page Not Found'));

export default pageNotFoundHandler;
