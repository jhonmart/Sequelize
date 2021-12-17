const Sequelize = require("sequelize");
const Product = require("../models/Product");
const User = require("../models/User");

const connection = new Sequelize(process.env.DATABASE_URL, {
    logging: process.env.NODE_ENV === "development"
});

[User, Product].map((model) => model.init(connection));

module.exports = connection;
