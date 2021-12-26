import { Sequelize } from 'sequelize-typescript';
import { User } from './models/user.model';
import { List } from './models/list.model';
import { Song } from './models/song.model';
import { SongList } from './models/song-list.model';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'sqlite::memory:',
  models: [User, List, Song, SongList],
  repositoryMode: true,
  define: {
    timestamps: false,
  },
});
