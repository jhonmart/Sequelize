"use strict";
const { Model, Sequelize } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          isEmail: true,
          unique: true
        },
        gender: Sequelize.ENUM("male", "female", "others"),
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        birthday: Sequelize.DATE
      },
      {
        sequelize,
        tableName: "users"
      }
    );
  }

  getData() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      gender: this.gender,
      birthday: this.birthday,
    };
  }
}

module.exports = User;
