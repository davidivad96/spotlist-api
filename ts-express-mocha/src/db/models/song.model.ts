import { DataTypes } from 'sequelize';
import { Model, Table, Column, PrimaryKey, BelongsToMany, Default } from 'sequelize-typescript';
import { List, SongList } from '.';

@Table
class Song extends Model {
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  @Column(DataTypes.UUIDV4)
  id: string;

  @Column(DataTypes.STRING)
  title: string;

  @Column(DataTypes.STRING)
  artist: string;

  @BelongsToMany(() => List, () => SongList)
  lists: List[];
}

export default Song;
