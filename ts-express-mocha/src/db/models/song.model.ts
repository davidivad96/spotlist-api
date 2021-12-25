import { Sequelize, DataTypes } from 'sequelize';

const SongModelDefiner = (sequelize: Sequelize) => {
  sequelize.define(
    'Song',
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      artist: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );
};

export default SongModelDefiner;
