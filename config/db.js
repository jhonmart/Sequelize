const { Sequelize } = require("sequelize");

module.exports = new Sequelize(process.env.OPTIONS_DB);
