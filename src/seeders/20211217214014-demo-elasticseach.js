"use strict";
const { client } = require("../services/elasticsearch");
const { scanFiles } = require("../services/readfile");

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
    await Promise.all(
      products.map((product) =>
        client.index(
          {
            index: "elastic_product",
            type: "type_elastic_product",
            body: product,
          },
          (error) => error && console.log({ error, product })
        )
      )
    );
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
    await Promise.all(
      users.map((user) =>
        client.index(
          {
            index: "elastic_user",
            type: "type_elastic_user",
            body: user,
          },
          (error) => error && console.log({ error, user })
        )
      )
    );
    const photos = await scanFiles();
    await Promise.all(
      photos.map((photo) =>
        client.index(
          {
            index: "elastic_photo",
            type: "type_elastic_photo",
            body: photo,
          },
          (error) => error && console.log({ error, photo })
        )
      )
    );
  },

  down: async (queryInterface, Sequelize) => {
  },
};
