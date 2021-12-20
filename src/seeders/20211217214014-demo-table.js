"use strict";
const { client } = require("../services/elasticsearch");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = [
      {
        id: "e0211638-e029-40d7-b06a-4921ff84691a",
        name: "Borracha dupla",
        description: "Boa para apagar desenhos a lápis",
        type: "tools",
        count: 23,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "55ed5eb2-199f-4412-9733-5d784e0215bd",
        name: "Borracha dado (6 lados)",
        description: "Boa para apagar desenhos a lápis",
        type: "tools",
        count: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    const users = [
      {
        id: "75b68de2-575a-4c45-aaf1-880fd8e4b757",
        name: "John",
        gender: "male",
        birthday: "1998-02-16",
        email: "jhon.mart@mail.com",
        password: "a2N23_*2@nc!2021",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "377b95f9-1bf2-46e8-ba59-5d017740c9ed",
        name: "Mart",
        gender: "others",
        birthday: "1984-04-22",
        email: "mart@mail.com",
        password: "asda*2@asd2!2021",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "cda5d513-ac5c-40b1-9a96-9b9923240036",
        name: "Mary",
        gender: "female",
        birthday: "2005-08-04",
        email: "mary@mail.com",
        password: "asd2*2@asda!1231",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("products", products, {});
    await queryInterface.bulkInsert("users", users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(
      "users",
      {
        id: {
          [Sequelize.Op.in]: [
            "75b68de2-575a-4c45-aaf1-880fd8e4b757",
            "377b95f9-1bf2-46e8-ba59-5d017740c9ed",
            "cda5d513-ac5c-40b1-9a96-9b9923240036",
          ],
        },
      },
      {}
    );
    await queryInterface.bulkDelete(
      "products",
      {
        id: {
          [Sequelize.Op.in]: [
            "e0211638-e029-40d7-b06a-4921ff84691a",
            "55ed5eb2-199f-4412-9733-5d784e0215bd",
          ],
        },
      },
      {}
    );
  },
};
