'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    toCustomJSON() {
      return {
        ...this.toJSON(),
        nextLevelCount: parseInt(this.dataValues.nextLevelCount, 10) || null,
        bonuses: parseFloat(this.dataValues.bonuses) || null,
      }
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(this, { foreignKey: 'parentId', as: 'children' });
      this.belongsTo(this, { foreignKey: 'parentId', as: 'parent' });
    }
  }
  Member.init({
    name: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      onDelete: 'CASCADE',
      references: {
        model: 'Member',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      onDelete: 'SET NULL',
      references: {
        model: 'User',
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      onDelete: 'SET NULL',
      references: {
        model: 'User',
      },
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      onDelete: 'SET NULL',
      references: {
        model: 'User',
      },
    },
    deletedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      onDelete: 'SET NULL',
      references: {
        model: 'User',
      },
    },
  }, {
    sequelize,
    modelName: 'Member',
    freezeTableName: true,
    paranoid: true
  });
  return Member;
};