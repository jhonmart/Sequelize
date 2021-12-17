"use strict";
const { Model, Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
const uuid = require('uuid');

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
        tableName: "users",
        hooks: {
          beforeCreate: async (user) => {
            user.id = uuid.v4();
            if (user.password) {
              const salt = await bcrypt.genSaltSync(10, "a");
              user.password = bcrypt.hashSync(user.password, salt);
            }
          },
          beforeUpdate: async (user) => {
            if (user.password) {
              const salt = await bcrypt.genSaltSync(10, "a");
              user.password = bcrypt.hashSync(user.password, salt);
            }
          },
        },
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

  validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

module.exports = User;
