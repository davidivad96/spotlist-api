import { DataTypes } from 'sequelize';
import { Model, Table, Column, ForeignKey } from 'sequelize-typescript';
import { Song, List } from '.';

@Table
class SongList extends Model {
  @ForeignKey(() => Song)
  @Column(DataTypes.UUIDV4)
  songId: string;

  @ForeignKey(() => List)
  @Column(DataTypes.UUIDV4)
  listId: string;
}

export default SongList;
