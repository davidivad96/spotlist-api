import { RequestHandler } from 'express';
import { songRepository, songListRepository } from '../repositories';

const createSong: RequestHandler = async (req, res): Promise<void> => {
  const { listId } = req.params;
  const { title, artist } = req.body;
  const song = await songRepository.create({ title, artist });
  await songListRepository.create({ songId: song.id, listId });
  res.status(201).json({ data: { song } });
};

export { createSong };
