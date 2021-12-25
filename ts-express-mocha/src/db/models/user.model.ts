import { Sequelize, DataTypes } from 'sequelize';

const UserModelDefiner = (sequelize: Sequelize) => {
  sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );
};

export default UserModelDefiner;
