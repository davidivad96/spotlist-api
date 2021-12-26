import { RequestHandler } from 'express';
import { tryCatchWrapper } from '../utils/tryCatchWrapper';
import { Unauthorized } from '../utils/errors';
import { userRepository } from '../repositories';
import { validatePassword } from '../utils/functions';

const isAuthorized: RequestHandler = async (req, _res, next) => {
  if (req.headers.authorization) {
    const base64data = req.headers.authorization.split(' ')[1];
    const data = Buffer.from(base64data.toString(), 'base64').toString('ascii');
    const name = data.split(':')[0];
    const password = data.split(':')[1];
    const user = await userRepository.findOne({ where: { name } });
    if (!user || !validatePassword(password, user.password)) {
      throw new Unauthorized('Invalid credentials');
    }
    req.userId = user.id;
    next();
  } else {
    throw new Unauthorized('No Authorization header');
  }
};

export default tryCatchWrapper(isAuthorized);
