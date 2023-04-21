'use strict';
const password = require('../utils/password')
const jwt = require('../utils/jwt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role'
      })
    }

    static findByUsername(username, { where, ...options } = {}) {
      return this.findOne({
        where: {
          ...where,
          username,
        },
        ...options,
      });
    }

    async comparePassword(plainPassword) {
      const isCompare = await password.compare(plainPassword, this.password);

      if (isCompare) {
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    }

    getToken() {
      const payload = {
        userId: this.id,
      };

      return {
        accessToken: jwt.signToken(payload, process.env.JWT_SECRET),
      };
    }
  }

  User.init({
    name: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: null,
      unique: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    deletedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
  }, {
    sequelize,
    modelName: 'User',
    freezeTableName: true,
    paranoid: true
  });
  return User;
};