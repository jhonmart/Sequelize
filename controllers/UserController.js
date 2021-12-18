const uuid = require('uuid');
const bcrypt = require("bcrypt");
const { Router } = require("express");
require("../database");
const User = require("../models/User");
const UUID_FORMAT = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";

module.exports = Router()
  .post("/", async function (req, res) {
    const { name, email, birthday, password } = req.body;

    if (name && email && birthday && password) {
      try {
        const salt = await bcrypt.genSaltSync(10, "a");
        req.body.id = uuid.v4();
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        const usuario = await User.create(req.body);
        return res.status(201).json(usuario.getData());
      } catch (error) {
        return res.status(400).json(error.errors.map(item => item.message));
      }
    }
    res.status(400).json({ error: "Campos não recebidos" });
  })
  .post("/entrar", async function (req, res) {
    const { email, password } = req.body;

    if (email && password) {
      const usuario = await User.findOne({ where: { email } });
      return usuario && bcrypt.compareSync(password, usuario.password)
        ? res.json({ success: "Ok", token: "" })
        : res.status(401).json({ error: "Usuário/Senha errados" });
    }
    res.status(400).json({ error: "Campos não recebidos" });
  })
  .get(`/:id(${UUID_FORMAT})?`, async function (req, res) {
    const id = req.params.id;

    if (id) {
      const usuario = await User.findByPk(id);
      usuario
        ? res.json(usuario.getData())
        : res.status(404).json({ error: "Usuário não encontrado" });
    } else {
      const usuarios = await User.findAll();
      res.json(usuarios.map((usuario) => usuario.getData()));
    }
  })
  .delete(`/:id(${UUID_FORMAT})`, async function (req, res) {
    const id = req.params.id;

    const usuario = await User.findByPk(id);

    if (usuario) {
      await usuario.destroy();
      return res.status(202).json({ success: "Usuário apagado" });
    }
    res.status(404).json({ error: "Usuário não encontrado" });
  })
  .put(`/:id(${UUID_FORMAT})`, async function (req, res) {
    const usuario = await User.findByPk(req.params.id);

    if (usuario) {
      const { name, email, birthday, password } = req.body;

      if (name && email && birthday && password) {
        const salt = await bcrypt.genSaltSync(10, "a");
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        usuario.set(req.body);
        await usuario.save();
        return res.json(usuario.getData());
      }
      return res.status(412).json({ error: "Campos não recebidos" });
    }
    res.status(404).json({ error: "Usuário não encontrado" });
  })
  .patch(`/:id(${UUID_FORMAT})`, async function (req, res) {
    const { name, email, birthday, password } = req.body;

    if (name || email || birthday || password) {
      const usuario = await User.findByPk(req.params.id);
      if (usuario) {
        if (req.body.password) {
          const salt = await bcrypt.genSaltSync(10, "a");
          req.body.password = bcrypt.hashSync(req.body.password, salt);
        }
        usuario.set(req.body);
        await usuario.save();
        return res.json(usuario.getData());
      } else return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.status(412).json({ error: "Campos não recebidos" });
  });
