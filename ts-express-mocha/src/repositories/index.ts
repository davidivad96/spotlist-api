import { sequelize } from '../db';
import { List } from '../db/models/list.model';
import { SongList } from '../db/models/song-list.model';
import { Song } from '../db/models/song.model';
import { User } from '../db/models/user.model';

const listRepository = sequelize.getRepository(List);
const userRepository = sequelize.getRepository(User);
const songRepository = sequelize.getRepository(Song);
const songListRepository = sequelize.getRepository(SongList);

export { listRepository, userRepository, songRepository, songListRepository };
