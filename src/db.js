const { Sequelize, DataTypes, Model } = require("sequelize");

require("dotenv").config({
  path: process.env.NODE_ENV === "dev" ? ".env.dev" : ".env",
});

class User extends Model {}
class Product extends Model {}

(async () => {
  try {
    const sequelize = new Sequelize(process.env.OPTIONS_DB);
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    User.init(
      {
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "User",
      }
    );
    Product.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        type: {
          type: DataTypes.ENUM('food', 'utilitary', 'clothes', 'tools'),
          allowNull: false,
        },
        count: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "Product",
      }
    );
    await sequelize.sync();
    return sequelize;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return false;
  }
})();

exports.all = { User, Product };
