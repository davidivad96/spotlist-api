import { Sequelize } from 'sequelize';
import UserModelDefiner from './models/user.model';
import ListModelDefiner from './models/list.model';
import SongModelDefiner from './models/song.model';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'sqlite::memory:',
});

const modelDefiners = [UserModelDefiner, ListModelDefiner, SongModelDefiner];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

(() => {
  const { User, List, Song } = sequelize.models;

  User.hasMany(List);
  List.belongsTo(User);

  List.belongsToMany(Song, { through: 'SongList' });
  Song.belongsToMany(List, { through: 'SongList' });
})();

const db = { sequelize };

export default db;
