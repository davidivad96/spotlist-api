import { DataTypes } from 'sequelize';
import { Model, Table, Column, PrimaryKey, BelongsToMany, Default } from 'sequelize-typescript';
import { List } from './list.model';
import { SongList } from './song-list.model';

@Table
export class Song extends Model {
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
