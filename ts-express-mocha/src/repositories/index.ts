import { sequelize } from '../db';
import { Song, List, SongList, User } from '../db/models';

const listRepository = sequelize.getRepository(List);
const userRepository = sequelize.getRepository(User);
const songRepository = sequelize.getRepository(Song);
const songListRepository = sequelize.getRepository(SongList);

export { listRepository, userRepository, songRepository, songListRepository };
