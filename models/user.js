const { DataTypes, Model } = require("sequelize");
const bcrypt = require('bcrypt');
const database = require("../config/db");

class User extends Model {
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

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
      unique: true
    },
    gender: DataTypes.ENUM("male", "female", "others"),
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: DataTypes.DATE,
  },
  {
    sequelize: database,
    modelName: "User",
    hooks: {
      beforeCreate: async (user) => {
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
    }
  }
);

User.sync();

module.exports = User;
