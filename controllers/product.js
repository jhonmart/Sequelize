var express = require("express");
var router = express.Router();
const Product = require("../models/product");

router
  .post("/", async function (req, res) {
    const { name, type, count } = req.body;

    if (name && type && count) {
      const produto = await Product.create(req.body);
      return res.json(produto.getData());
    }
    return res.status(400).json({ error: "Dados não recebido" });
  })
  .get("/:id?", async function (req, res) {
    const id = req.params.id;

    if (id) {
      const produto = await Product.findByPk(id);
      produto
        ? res.json(produto.getData())
        : res.status(404).json({ error: "Produto não encontrado" });
    } else {
      const produtos = await Product.findAll();
      produtos
        ? res.json(produtos.map((produto) => produto.getData()))
        : res.status(204).json([]);
    }
  })
  .delete("/:id", async function (req, res) {
    const id = req.params.id;

    if (!id) return res.status(400).json({ error: "ID não recebido" });
    const produto = await Product.findByPk(id);

    if (produto) {
      await produto.destroy();
      res.status(202).json({ success: "Produto apagado" });
    } else res.status(404).json({ error: "Produto não encontrado" });
  })
  .put("/:id", async function (req, res) {
    const id = req.params.id;
    const { name, type, count } = req.body;

    if (!id) return res.status(400).json({ error: "ID não recebido" });
    const produto = await Product.findByPk(id);

    if (produto) {
      if (name && type && count) {
        produto.set(req.body);
        await produto.save();
        return res.json(produto.getData());
      }
    } else return res.status(404).json({ error: "Produto não encontrado" });
    res.json({ error: "Dados não recebido" });
  })
  .patch("/:id", async function (req, res) {
    const id = req.params.id;
    const { name, type, count } = req.body;

    if (!id) return res.status(400).json({ error: "ID não recebido" });
    else if (name || type || count) {
      const produto = await Product.findByPk(id);
      if (produto) {
        produto.set(req.body);
        await produto.save();
        return res.json(produto.getData());
      } else return res.status(400).json({ error: "Produto não encontrado" });
    }
    res.status(412).json({ error: "Campos não recebidos" });
  });

module.exports = router;
