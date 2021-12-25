const Sequelize = require("sequelize");
const Product = require("../models/Product");
const User = require("../models/User");
const Photo = require("../models/Photo");

const connection = new Sequelize(process.env.DATABASE_URL, {
    logging: process.env.NODE_ENV === "development"
});

[User, Product, Photo].map((model) => model.init(connection));

module.exports = connection;
