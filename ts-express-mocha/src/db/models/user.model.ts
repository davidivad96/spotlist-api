import { DataTypes } from 'sequelize';
import { Model, Table, Column, HasMany, PrimaryKey, Default, BeforeCreate } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { List } from './list.model';

@Table
export class User extends Model {
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  @Column(DataTypes.UUIDV4)
  id: string;

  @Column
  name: string;

  @Column
  password: string;

  @HasMany(() => List)
  lists: List[];

  @BeforeCreate
  static hashPassword(instance: User) {
    const salt = bcrypt.genSaltSync(10);
    instance.password = bcrypt.hashSync(instance.password, salt);
  }
}
