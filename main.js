var express = require('express')
var router = express.Router()
const { User, Product } = require('./src/db').all


router.post('/cadastro', async function (req, res) {
  const nome = req.body.name;
  const sobrenome = req.body.last_name;
  if (!nome || !sobrenome) res.json({error: "Dados não recebido"})
  else {
    const usuario = await User.create({
      firstName: nome,
      lastName: sobrenome
    });
    res.json(usuario.toJSON())
  }
})

router.post('/cadastro/produto', async function (req, res) {
  const nome = req.body.nome;
  const tipo = req.body.tipo;
  const quantidade = req.body.quantidade;
  const descricao = req.body.descricao;
  if (!nome || !tipo || !quantidade) res.json({error: "Dados não recebido"})
  else {
    const produto = await Product.create({
      name: nome,
      type: tipo,
      count: quantidade,
      description: descricao
    });
    res.json(produto.toJSON())
  }
})

module.exports = router