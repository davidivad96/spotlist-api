'use strict';

const USERS_DATA = require('../../data/users.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    console.log(USERS_DATA);
    return queryInterface.bulkInsert('Users', USERS_DATA);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
