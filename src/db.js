const { Sequelize } = require("sequelize");

require("dotenv").config({
  path: process.env.NODE_ENV === "dev" ? ".env.dev" : ".env",
});

const sequelize = new Sequelize(process.env.OPTIONS_DB);

module.exports = sequelize;
