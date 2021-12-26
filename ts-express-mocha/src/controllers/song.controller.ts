import { RequestHandler, Response } from 'express';
import { Song } from '../db/models/song.model';
import { songRepository, songListRepository } from '../repositories';

const createSong: RequestHandler = async (req, res): Promise<Response<Song>> => {
  const { listId } = req.params;
  const { title, artist } = req.body;
  const data = await songRepository.create({ title, artist });
  await songListRepository.create({ songId: data.id, listId });
  return res.status(201).json({ data });
};

export { createSong };
