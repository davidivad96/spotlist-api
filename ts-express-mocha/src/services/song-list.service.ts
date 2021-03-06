import { SongList } from '../db/models';
import { songListRepository } from '../repositories';

class SongListService {
  public static async create(songId: string, listId: string): Promise<SongList> {
    return await songListRepository.create({ songId, listId });
  }
}

export default SongListService;
