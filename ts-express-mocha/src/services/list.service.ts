import { List } from '../db/models/list.model';
import { Song } from '../db/models/song.model';
import { listRepository, songRepository } from '../repositories';
import SongService from './song.service';
import SongListService from './song-list.service';

class ListService {
  public static async findAllByUserId(userId: string): Promise<List[]> {
    return await listRepository.findAll({
      where: { userId },
      include: [{ model: songRepository, as: 'songs', through: { attributes: [] } }],
    });
  }

  public static async findByPk(listId: string): Promise<List> {
    return await listRepository.findByPk(listId, {
      include: [{ model: songRepository, as: 'songs', through: { attributes: [] } }],
    });
  }

  public static async findOne(listId: string, userId: string): Promise<List> {
    return await listRepository.findOne({
      where: { id: listId, userId: userId },
      include: [{ model: songRepository, as: 'songs', through: { attributes: [] } }],
    });
  }

  public static async create(name: string, userId: string, songs: Song[]): Promise<List> {
    const list = await listRepository.create({ name, userId });
    for (const song of songs) {
      const songId = (await SongService.create(song.title, song.artist)).id;
      await SongListService.create(songId, list.id);
    }
    return list;
  }
}

export default ListService;
