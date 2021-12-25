const { v4: uuid } = require("uuid");
const { Router } = require("express");
const path = require("path");
require("../database");
const Photo = require("../models/Photo");
const { client } = require("../services/elasticsearch");
const { readFile } = require("fs/promises");
const UUID_FORMAT =
  "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";

module.exports = Router()
  .post("/", async function (req, res) {
    const { name, url, title } = req.body;

    if (name && url && title) {
      req.body.id = uuid();
      const photo = await Photo.create(req.body);
      await client.index({
        index: "elastic_photo",
        type: "type_elastic_photo",
        body: photo.getData(),
      });
      return res.status(201).json(photo.getData());
    }
    return res.status(400).json({ error: "Dados não recebido" });
  })
  .get(`/:id(${UUID_FORMAT})?`, async function (req, res) {
    const id = req.params.id;
    if (id) {
      const photo = await Photo.findByPk(id);
      photo
        ? res.json(photo.getData())
        : res.status(404).json({ error: "Foto não encontrada" });
    } else {
      const photos = await Photo.findAll();
      res.json(photos.map((photo) => photo.getData()));
    }
  })
  .delete(`/:id(${UUID_FORMAT})`, async function (req, res) {
    const photo = await Photo.findByPk(req.params.id);

    if (photo) {
      await photo.destroy();
      res.status(202).json({ success: "Foto apagado" });
    } else res.status(404).json({ error: "Foto não encontrada" });
  })
  .put(`/:id(${UUID_FORMAT})`, async function (req, res) {
    const { name, type, count } = req.body;

    const photo = await Photo.findByPk(req.params.id);

    if (photo) {
      if (name && type && count) {
        photo.set(req.body);
        await photo.save();
        return res.json(photo.getData());
      }
    } else return res.status(404).json({ error: "Foto não encontrada" });
    res.status(412).json({ error: "Campos não recebidos" });
  })
  .patch(`/:id(${UUID_FORMAT})`, async function (req, res) {
    const { name, type, count } = req.body;

    if (name || type || count) {
      const photo = await Photo.findByPk(req.params.id);
      if (photo) {
        photo.set(req.body);
        await photo.save();
        return res.json(photo.getData());
      } else return res.status(404).json({ error: "Foto não encontrada" });
    }
    res.status(412).json({ error: "Campos não recebidos" });
  })
  .get(`/:id(${UUID_FORMAT})/ver`, async function (req, res) {
    const response = await client.search({
      index: "elastic_photo",
      body: {
        query: {
          match_phrase: { id: req.params.id },
        },
      },
    });
    if (response.hits.hits.length) {
      const photo = response.hits.hits[0]._source;
      return res.sendFile(`${photo.url}/${photo.title}`);
    }
    res.status(404).json({ error: "Foto não encontrada" });
  })
  .get(`/paginada`, async function (req, res) {
    const { count, page } = req.query;
    if (page < 1 || count < 1)
      return res.status(400).json({ error: "Valores inválidos" });
    const response = await client.search({
      index: "elastic_photo",
      body: {
        from: (page - 1) * count,
        size: count,
        track_total_hits: true,
      },
    });
    const list = response.hits.hits.map((data) => data._source);
    res.json({
      list,
      page,
      total: response.hits.total.value,
    });
  })
  .get("/pesquisar/:search", async function (req, res) {
    const searchText = req.params.search;
    const response = await client.search({
      index: "elastic_photo",
      body: {
        query: {
          wildcard: { name: `*${searchText.trim()}*` },
        },
      },
    });
    const photos = response.hits.hits.map((data) => data._source);
    const html = photos
      .map((photo) =>
        photo.name.includes(".mp4")
          ? `<video width="400" controls>
              <source src="/fotos/${photo.id}/ver" type="video/mp4">
            </video>`
          : `<img width="200" src="/fotos/${photo.id}/ver"/>`
      )
      .join("");
    return res.send(html);
  });
