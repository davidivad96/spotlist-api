import { RequestHandler } from 'express';
import { listRepository, songListRepository, songRepository, userRepository } from '../repositories';
import { BadRequest, Unauthorized } from '../utils/errors';

const getLists: RequestHandler = async (req, res): Promise<void> => {
  const { userId } = req.params;
  const user = await userRepository.findByPk(userId);
  if (!user || userId !== req.userId) {
    throw new Unauthorized('Invalid user id');
  }
  const lists = await listRepository.findAll({
    where: { userId: userId },
    include: [{ model: songRepository, as: 'songs', through: { attributes: [] } }],
  });
  res.status(200).json({ data: { lists } });
};

const getList: RequestHandler = async (req, res): Promise<void> => {
  const { userId, listId } = req.params;
  const user = await userRepository.findByPk(userId);
  if (!user || userId !== req.userId) {
    throw new Unauthorized('Invalid user id');
  }
  const list = await listRepository.findOne({
    where: { id: listId, userId: userId },
    include: [{ model: songRepository, as: 'songs', through: { attributes: [] } }],
  });
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
  const user = await userRepository.findByPk(userId);
  if (!user || userId !== req.userId) {
    throw new Unauthorized('Invalid user id');
  }
  let list = await listRepository.create({ name, userId: userId });
  for (const song of songs) {
    const songId = (await songRepository.create({ title: song.title, artist: song.artist })).id;
    await songListRepository.create({ songId, listId: list.id });
  }
  list = await listRepository.findByPk(list.id, {
    include: [{ model: songRepository, as: 'songs', through: { attributes: [] } }],
  });
  res.status(201).json({ data: { list } });
};

export { getLists, getList, createList };
