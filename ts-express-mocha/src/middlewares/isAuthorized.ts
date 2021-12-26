import { RequestHandler } from 'express';
import * as jwt from 'jsonwebtoken';
import { tryCatchWrapper } from '../utils/tryCatchWrapper';
import { Unauthorized } from '../utils/errors';
import { userRepository } from '../repositories';
import { validatePassword } from '../utils/functions';
import { DataStoredInToken } from '../interfaces';

const isAuthorized: RequestHandler = async (req, _res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'supersecret') as DataStoredInToken;
    const {
      data: { name, password },
    } = decodedToken;
    const user = await userRepository.findOne({ where: { name } });
    if (!user || !validatePassword(password, user.password)) {
      throw new Unauthorized('Invalid credentials');
    }
    next();
  } else {
    throw new Unauthorized('No Authorization header');
  }
};

export default tryCatchWrapper(isAuthorized);
