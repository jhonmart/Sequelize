"use strict";
const { Model, DataTypes } = require("sequelize");

class Product extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("food", "utilitary", "clothes", "tools"),
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
      tableName: "products",
    });
  }

  getData() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      type: this.type,
      count: this.count,
    };
  }
};

module.exports = Product;
