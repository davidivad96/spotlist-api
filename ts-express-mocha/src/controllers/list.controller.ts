import { RequestHandler, Response } from 'express';
import { List } from '../db/models/list.model';
import { listRepository, songRepository } from '../repositories';

const getLists: RequestHandler = async (req, res): Promise<Response<List[]>> => {
  const { userId } = req.params;
  const data = await listRepository.findAll({
    where: { userId: userId },
    include: [{ model: songRepository, as: 'songs', through: { attributes: [] } }],
  });
  return res.status(200).json({ data });
};

const getList: RequestHandler = async (req, res): Promise<Response<List>> => {
  const { userId, listId } = req.params;
  const data = await listRepository.findOne({
    where: { id: listId, userId: userId },
    include: [{ model: songRepository, as: 'songs', through: { attributes: [] } }],
  });
  return res.status(200).json({ data });
};

const createList: RequestHandler = async (req, res): Promise<Response<List>> => {
  const { userId } = req.params;
  const data = await listRepository.create({ userId: userId });
  return res.status(201).json({ data });
};

export { getLists, getList, createList };
