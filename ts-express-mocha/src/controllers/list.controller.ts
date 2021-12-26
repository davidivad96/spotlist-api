import { RequestHandler } from 'express';
import { listRepository, songRepository } from '../repositories';

const getLists: RequestHandler = async (req, res): Promise<void> => {
  const { userId } = req.params;
  const lists = await listRepository.findAll({
    where: { userId: userId },
    include: [{ model: songRepository, as: 'songs', through: { attributes: [] } }],
  });
  res.status(200).json({ data: { lists } });
};

const getList: RequestHandler = async (req, res): Promise<void> => {
  const { userId, listId } = req.params;
  const list = await listRepository.findOne({
    where: { id: listId, userId: userId },
    include: [{ model: songRepository, as: 'songs', through: { attributes: [] } }],
  });
  res.status(200).json({ data: { list } });
};

const createList: RequestHandler = async (req, res): Promise<void> => {
  const { userId } = req.params;
  const { name } = req.body;
  const list = await listRepository.create({ name, userId: userId });
  res.status(201).json({ data: list });
};

export { getLists, getList, createList };
