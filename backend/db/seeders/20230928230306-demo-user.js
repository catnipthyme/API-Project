'use strict';

const { User } = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await User.bulkCreate([
    {
      email: 'demo@user.io',
      username: 'Demo-user',
      firstName: 'Demo',
      lastName: 'User',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      email: 'demo2@user.io',
      username: 'Demo-user2',
      firstName: 'Demoni',
      lastName: 'Userni',
      hashedPassword: bcrypt.hashSync('password2')
    },
    {
      email: 'demo3@user.io',
      username: 'Demo-user3',
      firstName: 'Demosan',
      lastName: 'Usersan',
      hashedPassword: bcrypt.hashSync('password3')
    }
   ], {validate: true});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-user', 'Demo-user2', 'Demo-user3']}
    }, {});
  }
};
