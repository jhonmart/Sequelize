"use strict";
const { Model, DataTypes } = require("sequelize");

class Photo extends Model {
  static init(sequelize) {
    super.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          title: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          url: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          description: DataTypes.STRING,
          deviceFolder: DataTypes.STRING,
          imageViews: DataTypes.INTEGER,
          creationTime: DataTypes.DATE,
          createdAt: DataTypes.DATE,
          updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      tableName: "photos",
    });
  }
};

module.exports = Photo;
