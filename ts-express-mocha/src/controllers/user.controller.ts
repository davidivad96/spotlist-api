import { RequestHandler } from 'express';
import { listRepository, userRepository } from '../repositories';
import { BadRequest } from '../utils/errors';

const getUsers: RequestHandler = async (req, res): Promise<void> => {
  const users = await userRepository.findAll({ include: [listRepository] });
  res.status(200).json({ data: { users } });
};

const createUser: RequestHandler = async (req, res): Promise<void> => {
  const { name, password } = req.body;
  let user = await userRepository.findOne({ where: { name } });
  if (user) {
    throw new BadRequest('User already exists');
  }
  user = await userRepository.create({ name, password });
  res.status(201).json({ data: { user } });
};

export { getUsers, createUser };
