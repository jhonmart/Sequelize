const server = require("../src/index.js");
const supertest = require("supertest");
const requestWithSupertest = supertest(server);

describe("Photo Endpoints (success)", () => {
  it("POST /fotos create photo", async () => {
    const res = await requestWithSupertest.post("/fotos").send({
      name: "IMG_20010815_163709_279.jpg",
      url: "/dir/sub_dir/IMG_20010815_163709_279.jpg",
      title: "IMG_20010815_163709_279",
    });
    expect(res.status).toEqual(201);
    expect(res.type).toEqual(expect.stringContaining("json"));
    delete res.body.id;
    expect(res.body).toEqual({
      name: "IMG_20010815_163709_279.jpg",
      url: "/dir/sub_dir/IMG_20010815_163709_279.jpg",
      title: "IMG_20010815_163709_279",
    });
  });

  it("GET /fotos should show all photos", async () => {
    const res = await requestWithSupertest.get("/fotos");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body.length).toEqual(3);
  });

  it("GET /fotos/e0211638-e029-40d7-b06a-4921ff84691a should show photo", async () => {
    const res = await requestWithSupertest.get(
      "/fotos/e0211638-e029-40d7-b06a-4921ff84691a"
    );
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({
      id: "e0211638-e029-40d7-b06a-4921ff84691a",
      name: "IMG_20010815_163709_279.jpg",
      url: "/dir/sub_dir/IMG_20010815_163709_279.jpg",
      title: "IMG_20010815_163709_279",
    });
  });

  it("GET /fotos/pesquisar/borra should show photo with elasticsearch", async () => {
    const res = await requestWithSupertest.get("/fotos/pesquisar/borra");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body[0].description).toEqual("Boa para apagar desenhos a lápis");
  });

  it("PUT /fotos/55ed5eb2-199f-4412-9733-5d784e0215bd update all data photo", async () => {
    const res = await requestWithSupertest
      .put("/fotos/55ed5eb2-199f-4412-9733-5d784e0215bd")
      .send({
      name: "IMG_20010815_163709_271.jpg",
      url: "/dir/sub_dir/IMG_20010815_163709_271.jpg",
      title: "IMG_20010815_163709_279",
      });
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({
      id: "55ed5eb2-199f-4412-9733-5d784e0215bd",
      name: "IMG_20010815_163709_271.jpg",
      url: "/dir/sub_dir/IMG_20010815_163709_271.jpg",
      title: "IMG_20010815_163709_279",
    });
  });

  it("PATCH /fotos/55ed5eb2-199f-4412-9733-5d784e0215bd update field photo", async () => {
    const res = await requestWithSupertest
      .patch("/fotos/55ed5eb2-199f-4412-9733-5d784e0215bd")
      .send({
        count: 12,
      });
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({
      id: "55ed5eb2-199f-4412-9733-5d784e0215bd",
      name: "IMG_20010815_163709_271.jpg",
      url: "/dir/sub_dir/IMG_20010815_163709_279.jpg",
      title: "IMG_20010815_163709_279",
    });
  });

  it("DELETE /fotos/55ed5eb2-199f-4412-9733-5d784e0215bd delete photo", async () => {
    const res = await requestWithSupertest.delete(
      "/fotos/55ed5eb2-199f-4412-9733-5d784e0215bd"
    );
    expect(res.status).toEqual(202);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ success: "Foto apagado" });
  });
});

describe("Photo Endpoints (fail)", () => {
  it("POST /fotos not create photo", async () => {
    const res = await requestWithSupertest.post("/fotos");
    expect(res.status).toEqual(400);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Dados n\u00E3o recebido" });
  });

  it("GET /fotos/55ed5eb2-199f-4412-9733-5d784e0215bd not should show photo", async () => {
    const res = await requestWithSupertest.get(
      "/fotos/55ed5eb2-199f-4412-9733-5d784e0215bd"
    );
    expect(res.status).toEqual(404);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Foto n\u00E3o encontrada" });
  });

  it("PUT /fotos/55ed5eb2-199f-4412-9733-5d784e0215bd not update all data photo", async () => {
    const res = await requestWithSupertest.put(
      "/fotos/55ed5eb2-199f-4412-9733-5d784e0215bd"
    );
    expect(res.status).toEqual(404);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Foto n\u00E3o encontrada" });
  });

  it("PATCH /fotos/55ed5eb2-199f-4412-9733-5d784e0215bd 404 update field photo", async () => {
    const res = await requestWithSupertest
      .patch("/fotos/55ed5eb2-199f-4412-9733-5d784e0215bd")
      .send({
      name: "IMG_20010815_163709_278.jpg",
      url: "/dir/sub_dir/IMG_20010815_163709_279.jpg",
      title: "IMG_20010815_163709_279",
      });
    expect(res.status).toEqual(404);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Foto n\u00E3o encontrada" });
  });

  it("PATCH /fotos/55ed5eb2-199f-4412-9733-5d784e0215bd not update field photo", async () => {
    const res = await requestWithSupertest.patch(
      "/fotos/55ed5eb2-199f-4412-9733-5d784e0215bd"
    );
    expect(res.status).toEqual(412);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Campos n\u00E3o recebidos" });
  });

  it("DELETE /fotos/55ed5eb2-199f-4412-9733-5d784e0215bd not delete photo", async () => {
    const res = await requestWithSupertest.delete(
      "/fotos/55ed5eb2-199f-4412-9733-5d784e0215bd"
    );
    expect(res.status).toEqual(404);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Foto n\u00E3o encontrada" });
  });

  it("PUT /fotos/e0211638-e029-40d7-b06a-4921ff84691a fail update all data third photo", async () => {
    const res = await requestWithSupertest.put(
      "/fotos/e0211638-e029-40d7-b06a-4921ff84691a"
    );
    expect(res.status).toEqual(412);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Campos n\u00E3o recebidos" });
  });

  it("PATCH /fotos/e0211638-e029-40d7-b06a-4921ff84691a fail update field third photo", async () => {
    const res = await requestWithSupertest.patch(
      "/fotos/e0211638-e029-40d7-b06a-4921ff84691a"
    );
    expect(res.status).toEqual(412);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Campos n\u00E3o recebidos" });
  });
});
