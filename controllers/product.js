const { Router } = require("express");
const Product = require("../models/product");

module.exports = Router()
  .post("/", async function (req, res) {
    const { name, type, count } = req.body;

    if (name && type && count) {
      const produto = await Product.create(req.body);
      return res.status(201).json(produto.getData());
    }
    return res.status(400).json({ error: "Dados não recebido" });
  })
  .get("/:id([0-9])?", async function (req, res) {
    const id = req.params.id;
    if (id) {
      const produto = await Product.findByPk(id);
      produto
        ? res.json(produto.getData())
        : res.status(404).json({ error: "Produto não encontrado" });
    } else {
      const produtos = await Product.findAll();
      res.json(produtos.map((produto) => produto.getData()));
    }
  })
  .delete("/:id", async function (req, res) {
    const produto = await Product.findByPk(req.params.id);

    if (produto) {
      await produto.destroy();
      res.status(202).json({ success: "Produto apagado" });
    } else res.status(404).json({ error: "Produto não encontrado" });
  })
  .put("/:id", async function (req, res) {
    const { name, type, count } = req.body;

    const produto = await Product.findByPk(req.params.id);

    if (produto) {
      if (name && type && count) {
        produto.set(req.body);
        await produto.save();
        return res.json(produto.getData());
      }
    } else return res.status(404).json({ error: "Produto não encontrado" });
    res.status(412).json({ error: "Campos não recebidos" });
  })
  .patch("/:id", async function (req, res) {
    const { name, type, count } = req.body;

    if (name || type || count) {
      const produto = await Product.findByPk(req.params.id);
      if (produto) {
        produto.set(req.body);
        await produto.save();
        return res.json(produto.getData());
      } else return res.status(404).json({ error: "Produto não encontrado" });
    }
    res.status(412).json({ error: "Campos não recebidos" });
  })
  .get("/listar/:id?", async function (req, res) {
    const id = req.params.id;
    const PATH_TEMPLATE = "../templates/product";

    if (id) {
      const produto = await Product.findByPk(id);
      produto
        ? res.render(PATH_TEMPLATE, { products: [produto] })
        : res.status(404).send("<h1>Produto não encontrado</h1>");
    } else {
      const products = await Product.findAll();
      res.render(PATH_TEMPLATE, { products });
    }
  });
