import { Model, DataTypes } from 'sequelize';
import sequelize from '..';

class User extends Model {
  public id!: string;
  public name!: string;
  public password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: 'Users',
    timestamps: false,
  },
);

User.sync();

export default User;
