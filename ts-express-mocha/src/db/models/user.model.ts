import { DataTypes } from 'sequelize';
import { Model, Table, Column, HasMany, PrimaryKey, Default } from 'sequelize-typescript';
import { List } from './list.model';

@Table
export class User extends Model {
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  @Column(DataTypes.UUIDV4)
  id!: string;

  @Column
  name!: string;

  @Column
  password!: string;

  @HasMany(() => List)
  lists: List[];
}
