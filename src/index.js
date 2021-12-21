const express = require("express");
const path = require('path');
const ProductController = require("./controllers/ProductController");
const UserController = require("./controllers/UserController");
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require(path.resolve(__dirname, 'services', 'swagger_output.json'));
var fs = require("fs");
const app = express();

app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(__dirname + "/public"));

app.use((req, res, next) => {
  req.path.includes("/user") && !req.headers.authorization
    ? res.redirect("/")
    : next();
});

app.use("/produto", ProductController);
app.use("/usuario", UserController);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/:template?", (req, res) => {
  const { template } = req.params;
  const file_path = __dirname + `/templates/${template || "index"}`;
  if (fs.existsSync(file_path+".ejs")) return res.render(file_path, { frutas: ["Limão", "Mamão", "Melancia"]});
  res.status(404).json({ error: "Não encontrado" });
});

module.exports = app;
