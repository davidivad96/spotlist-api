'use strict';

const bcrypt = require('bcrypt');
const USERS_DATA = require('../../data/users.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      USERS_DATA.map((user) => ({
        ...user,
        password: bcrypt.hashSync(user.password, bcrypt.genSaltSync(10)),
      })),
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
