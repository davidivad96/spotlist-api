import { DataTypes } from 'sequelize';
import { Model, Table, Column, ForeignKey } from 'sequelize-typescript';
import { List } from './list.model';
import { Song } from './song.model';

@Table
export class SongList extends Model {
  @ForeignKey(() => Song)
  @Column(DataTypes.UUIDV4)
  songId: string;

  @ForeignKey(() => List)
  @Column(DataTypes.UUIDV4)
  listId: string;
}
