import { RequestHandler } from 'express';
import { SongService, ListService, SongListService, UserService } from '../services';
import { BadRequest, Unauthorized } from '../utils/errors';

const addSongToList: RequestHandler = async (req, res): Promise<void> => {
  const { userId, listId } = req.params;
  const {
    song: { title, artist },
  } = req.body;
  const user = await UserService.findByPk(userId);
  if (!user || userId !== req.userId) {
    throw new Unauthorized('Invalid user id');
  }
  const list = await ListService.findOne(listId, userId);
  if (!list) {
    throw new BadRequest('Invalid list id');
  }
  const song = await SongService.create(title, artist);
  await SongListService.create(song.id, listId);
  res.status(201).json({ data: { song } });
};

export { addSongToList };
