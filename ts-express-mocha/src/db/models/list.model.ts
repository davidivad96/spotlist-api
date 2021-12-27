import { DataTypes } from 'sequelize';
import { Model, Table, Column, BelongsTo, BelongsToMany, PrimaryKey, ForeignKey, Default } from 'sequelize-typescript';
import { Song, SongList, User } from '.';

@Table
class List extends Model {
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  @Column(DataTypes.UUIDV4)
  id: string;

  @Column(DataTypes.STRING)
  name: string;

  @ForeignKey(() => User)
  @Column
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Song, () => SongList)
  songs: Song[];
}

export default List;
