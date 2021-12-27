import { RequestHandler } from 'express';
import ListService from '../services/list.service';
import UserService from '../services/user.service';
import { BadRequest, Unauthorized } from '../utils/errors';

const getLists: RequestHandler = async (req, res): Promise<void> => {
  const { userId } = req.params;
  const user = await UserService.findByPk(userId);
  if (!user || userId !== req.userId) {
    throw new Unauthorized('Invalid user id');
  }
  const lists = await ListService.findAllByUserId(userId);
  res.status(200).json({ data: { lists } });
};

const getList: RequestHandler = async (req, res): Promise<void> => {
  const { userId, listId } = req.params;
  const user = await UserService.findByPk(userId);
  if (!user || userId !== req.userId) {
    throw new Unauthorized('Invalid user id');
  }
  const list = await ListService.findOne(listId, userId);
  if (!list) {
    throw new BadRequest('Invalid list id');
  }
  res.status(200).json({ data: { list } });
};

const createList: RequestHandler = async (req, res): Promise<void> => {
  const { userId } = req.params;
  const {
    list: { name, songs },
  } = req.body;
  const user = await UserService.findByPk(userId);
  if (!user || userId !== req.userId) {
    throw new Unauthorized('Invalid user id');
  }
  let list = await ListService.create(name, userId, songs);
  list = await ListService.findByPk(list.id);
  res.status(201).json({ data: { list } });
};

export { getLists, getList, createList };
