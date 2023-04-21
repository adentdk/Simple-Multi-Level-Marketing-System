'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.bulkInsert('User', [
      {
        // id: 1,
        name: 'admin',
        username: 'admin',
        password: '$2b$10$gCRzK6ovw.tSkmr6F57ueOrzlxy7PW/uDPc7Ul1/GyuThSeIR5rl2', // 123456
        phoneNumber: '083147324889',
        roleId: 1, // admin
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.bulkDelete('User', null, {})
  }
};
