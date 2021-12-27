import { RequestHandler } from 'express';
import { UserService } from '../services';
import { BadRequest } from '../utils/errors';

const getUsers: RequestHandler = async (req, res): Promise<void> => {
  const users = await UserService.findAll();
  res.status(200).json({ data: { users } });
};

const createUser: RequestHandler = async (req, res): Promise<void> => {
  const {
    user: { name, password },
  } = req.body;
  let user = await UserService.findOne(name);
  if (user) {
    throw new BadRequest('User already exists');
  }
  user = await UserService.create(name, password);
  res.status(201).json({ data: { user } });
};

export { getUsers, createUser };
