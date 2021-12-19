const express = require("express");
const ProductController = require("./controllers/ProductController");
const UserController = require("./controllers/UserController");
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

app.use("/produtos", ProductController);
app.use("/usuarios", UserController);

app.get("/:template?", (req, res) => {
  const { template } = req.params;
  const file_path = __dirname + `/templates/${template || "index"}`;
  if (fs.existsSync(file_path+".ejs")) return res.render(file_path, { frutas: ["Limão", "Mamão", "Melancia"]});
  res.status(404).json({ error: "Não encontrado" });
});

module.exports = app;
