import { RequestHandler } from 'express';
import * as jwt from 'jsonwebtoken';
import { userRepository } from '../repositories';
import { BadRequest } from '../utils/errors';
import { validatePassword } from '../utils/functions';

const authUser: RequestHandler = async (req, res): Promise<void> => {
  const { name, password } = req.body;
  const user = await userRepository.findOne({ where: { name } });
  if (!user || !validatePassword(password, user.password)) {
    throw new BadRequest('Invalid credentials');
  }
  const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 120 * 60, data: { name, password } }, 'supersecret');
  res.status(200).send({ data: { token } });
};

export { authUser };
