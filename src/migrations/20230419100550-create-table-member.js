'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('Member', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(32),
        allowNull: false,
      },
      parentId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        onDelete: 'CASCADE',
        references: {
          model: 'Member',
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        onDelete: 'SET NULL',
        references: {
          model: 'User',
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        onDelete: 'SET NULL',
        references: {
          model: 'User',
        },
      },
      updatedBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        onDelete: 'SET NULL',
        references: {
          model: 'User',
        },
      },
      deletedBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        onDelete: 'SET NULL',
        references: {
          model: 'User',
        },
      },
    });
  },

  down: async (queryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('Member');
  },
};
