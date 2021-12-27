"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "username sudah ada",
        },
      },
      password: DataTypes.STRING,
      fullname: DataTypes.STRING,
      age: DataTypes.STRING,
      occupation: DataTypes.STRING,
      isMarried: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
