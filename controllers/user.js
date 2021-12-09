var express = require("express");
var router = express.Router();
const User = require("../models/user");

router
  .post("/", async function (req, res) {
    const nome = req.body.name;
    const email = req.body.email;
    const nascimento = req.body.birthday;
    const senha = req.body.password;

    if (!nome || !email || !nascimento || !senha)
      res.json({ error: "Dados não recebido" });
    else {
      const usuario = await User.create(req.body);
      res.json(usuario.getData());
    }
  })
  .post("/entrar", async function (req, res) {
    const email = req.body.email;
    const senha = req.body.password;

    if (!email || !senha) res.json({ error: "Dados não recebido" });
    else {
      const usuario = await User.findOne({ where: { email } });
      res.json(usuario.validPassword(senha) ? { success: "Ok" } : { error: "Falha" });
    }
  })
  .get("/:id?", async function (req, res) {
    const id = req.params.id;

    if (id) {
      const usuario = await User.findByPk(id);
      res.json(usuario.getData());
    } else {
      const usuarios = await User.findAll();
      res.json(usuarios.map((usuario) => usuario.getData()));
    }
  })
  .delete("/:id", async function (req, res) {
    const id = req.params.id;

    if (!id) return res.json({ error: "ID não recebido" });
    const usuario = await User.findByPk(id);

    await usuario.destroy();
    res.json({ success: "Usuário apagado" });
  })
  .put("/:id", async function (req, res) {
    const id = req.params.id;

    if (!id) return res.json({ error: "ID não recebido" });
    const usuario = await User.findByPk(id);

    const nome = req.body.name;
    const email = req.body.email;
    const nascimento = req.body.birthday;
    const senha = req.body.password;

    if (!nome || !email || !nascimento || !senha)
      res.json({ error: "Dados não recebido" });
    else {
      usuario.set(req.body);
      await usuario.save();
      res.json(usuario.getData());
    }
  })
  .patch("/:id", async function (req, res) {
    const id = req.params.id;

    if (!id) return res.json({ error: "ID não recebido" });
    const usuario = await User.findByPk(id);

    usuario.set(req.body);
    await usuario.save();
    res.json(usuario.getData());
  });

module.exports = router;
