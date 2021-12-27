import { Song } from '../db/models/song.model';
import { songRepository } from '../repositories';

class SongService {
  public static async create(title: string, artist: string): Promise<Song> {
    return await songRepository.create({ title, artist });
  }
}

export default SongService;
