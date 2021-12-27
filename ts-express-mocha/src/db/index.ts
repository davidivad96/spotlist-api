import { Sequelize } from 'sequelize-typescript';
import { Song, List, SongList, User } from './models';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'sqlite::memory:',
  models: [User, List, Song, SongList],
  repositoryMode: true,
  define: {
    timestamps: false,
  },
});
