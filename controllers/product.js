var express = require("express");
var router = express.Router();
const Product = require("../models/product");

router
  .post("/", async function (req, res) {
    const nome = req.body.name;
    const tipo = req.body.type;
    const quantidade = req.body.count;

    if (!nome || !tipo || !quantidade)
      res.json({ error: "Dados não recebido" });
    else {
      const produto = await Product.create(req.body);
      res.json(produto.getData());
    }
  })
  .get("/:id?", async function (req, res) {
    const id = req.params.id;

    if (id) {
      const produto = await Product.findByPk(id);
      res.json(produto.getData());
    } else {
      const produtos = await Product.findAll();
      res.json(produtos.map(produto => produto.getData()));
    }
  })
  .delete("/:id", async function (req, res) {
    const id = req.params.id;

    if (!id) return res.json({ error: "ID não recebido" });
    const produto = await Product.findByPk(id);

    await produto.destroy();
    res.json({ success: "Produto apagado" });
  })
  .put("/:id", async function (req, res) {
    const id = req.params.id;

    if (!id) return res.json({ error: "ID não recebido" });
    const produto = await Product.findByPk(id);

    const nome = req.body.name;
    const tipo = req.body.type;
    const quantidade = req.body.count;

    if (!nome || !tipo || !quantidade) res.json({ error: "Dados não recebido" });
    else {
      produto.set(req.body);
      await produto.save();
      res.json(produto.getData());
    }
  })
  .patch("/:id", async function (req, res) {
    const id = req.params.id;

    if (!id) return res.json({ error: "ID não recebido" });
    const produto = await Product.findByPk(id);

    produto.set(req.body);
    await produto.save();
    res.json(produto.getData());
  });

module.exports = router;
