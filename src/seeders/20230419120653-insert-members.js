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
    await queryInterface.bulkInsert('Member', [
      {
        // id: 1,
        name: 'aden trisna',
        parentId: null,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // id: 2,
        name: 'trisna',
        parentId: 1,
        userId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // id: 3,
        name: 'daud',
        parentId: 1,
        userId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // id: 4,
        name: 'kurnia',
        parentId: 2,
        userId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // id: 5,
        name: 'gita',
        parentId: 3,
        userId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // id: 6,
        name: 'trisna',
        parentId: 4,
        userId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // id: 7,
        name: 'trisna',
        parentId: 6,
        userId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.bulkDelete('Member', null, {})
  }
};
