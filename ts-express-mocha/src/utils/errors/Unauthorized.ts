import * as httpStatus from 'http-status';
import { errors } from '../constants/errors';
import { BaseError } from '.';

const { UNAUTHORIZED } = httpStatus;

class Unauthorized extends BaseError {
  constructor(message: string) {
    super(errors.unauthorized, UNAUTHORIZED, message || httpStatus['401_MESSAGE']);
  }
}

export default Unauthorized;
