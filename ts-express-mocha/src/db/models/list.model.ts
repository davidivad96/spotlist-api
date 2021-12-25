import { Sequelize, DataTypes } from 'sequelize';

const ListModelDefiner = (sequelize: Sequelize) => {
  sequelize.define(
    'List',
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
      },
    },
    {
      timestamps: false,
    },
  );
};

export default ListModelDefiner;
