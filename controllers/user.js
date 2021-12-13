const { Router } = require("express");
const User = require("../models/user");

module.exports = Router()
  .post("/", async function (req, res) {
    const { name, email, birthday, password } = req.body;

    if (name && email && birthday && password) {
      const usuario = await User.create(req.body);
      res.status(201).json(usuario.getData());
    }
    res.status(400).json({ error: "Dados não recebido" });
  })
  .post("/entrar", async function (req, res) {
    const { email, senha } = req.body;

    if (email && senha) {
      const usuario = await User.findOne({ where: { email } });
      usuario && usuario.validPassword(senha)
        ? res.json({ success: "Ok", token: "" })
        : res.status(401).json({ error: "Usuário/Senha errados" });
    }
    res.status(400).json({ error: "Dados não recebido" });
  })
  .get("/:id?", async function (req, res) {
    const id = req.params.id;

    if (id) {
      const usuario = await User.findByPk(id);
      usuario
        ? res.json(usuario.getData())
        : res.status(404).json({ error: "Usuário não encontrado" });
    } else {
      const usuarios = await User.findAll();
      usuarios
        ? res.json(usuarios.map((usuario) => usuario.getData()))
        : res.status(204).json([]);
    }
  })
  .delete("/:id", async function (req, res) {
    const id = req.params.id;

    if (!id) return res.status(400).json({ error: "ID não recebido" });
    const usuario = await User.findByPk(id);

    if (usuario) {
      await usuario.destroy();
      res.status(202).json({ success: "Usuário apagado" });
    } else res.status(404).json({ error: "Usuário não encontrado" });
  })
  .put("/:id", async function (req, res) {
    const id = req.params.id;

    if (!id) return res.status(400).json({ error: "ID não recebido" });
    const usuario = await User.findByPk(id);

    if (usuario) {
      const { name, email, birthday, password } = req.body;

      if (name && email && birthday && password) {
        usuario.set(req.body);
        await usuario.save();
        return res.json(usuario.getData());
      }
      return res.status(412).json({ error: "Dados não recebido" });
    }
    res.status(404).json({ error: "Usuário não encontrado" });
  })
  .patch("/:id", async function (req, res) {
    const id = req.params.id;
    const { name, email, birthday, password } = req.body;

    if (!id) return res.status(400).json({ error: "ID não recebido" });
    else if (name || email || birthday || password) {
      const usuario = await User.findByPk(id);
      if (usuario) {
        usuario.set(req.body);
        await usuario.save();
        return res.json(usuario.getData());
      } else return res.status(400).json({ error: "Usuário não encontrado" });
    }
    res.status(412).json({ error: "Campos não recebidos" });
  });
