import { RequestHandler } from 'express';
import { songRepository, listRepository, songListRepository, userRepository } from '../repositories';
import { BadRequest, Unauthorized } from '../utils/errors';

const addSongToList: RequestHandler = async (req, res): Promise<void> => {
  const { userId, listId } = req.params;
  const {
    song: { title, artist },
  } = req.body;
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
  const song = await songRepository.create({ title, artist });
  await songListRepository.create({ songId: song.id, listId });
  res.status(201).json({ data: { song } });
};

export { addSongToList };
