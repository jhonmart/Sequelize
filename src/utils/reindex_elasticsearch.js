require("../database");
const { client } = require("../services/elasticsearch");
const Product = require("../models/Product");
const User = require("../models/User");

(async function () {
  const list_products = await Product.findAll();
  await Promise.all(
    list_products.map((product) =>
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
  console.log("Finish reindex products");
})();

(async function () {
  const list_users = await User.findAll();
  await Promise.all(
    list_users.map((user) =>
      client.index(
        {
          index: "elastic_user",
          type: "type_elastic_user",
          body: user.getData(),
        },
        (error) => error && console.log({ error, user: user.getData() })
      )
    )
  );
  console.log("Finish reindex users");
})();