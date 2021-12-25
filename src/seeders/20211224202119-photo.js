"use strict";
const { scanFiles } = require("../services/readfile");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const photos = await scanFiles();
    await queryInterface.bulkInsert("photos", photos, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("photos");
  },
};
