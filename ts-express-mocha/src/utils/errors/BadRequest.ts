import * as httpStatus from 'http-status';
import { errors } from '../constants/errors';
import { BaseError } from '.';

const { BAD_REQUEST } = httpStatus;

class BadRequest extends BaseError {
  constructor(message: string) {
    super(errors.validation, BAD_REQUEST, message || httpStatus['400_MESSAGE']);
  }
}

export default BadRequest;
