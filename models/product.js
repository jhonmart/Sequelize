const { DataTypes, Model } = require("sequelize");
const database = require('../src/db');

class Product extends Model {
  getData() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      type: this.type,
      count: this.count
    };
  }
};

Product.init(
  {
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
    sequelize: database,
    modelName: "Product",
  }
);

Product.sync();

module.exports = Product;