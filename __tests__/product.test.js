const server = require("../src/index.js");
const supertest = require("supertest");
const requestWithSupertest = supertest(server);

describe("Product Endpoints (success)", () => {
  it("POST /produto create product", async () => {
    const res = await requestWithSupertest.post("/produto").send({
      name: "Borracha branca",
      description: "Boa para apagar desenhos a lápis",
      type: "tools",
      count: 5,
    });
    expect(res.status).toEqual(201);
    expect(res.type).toEqual(expect.stringContaining("json"));
    delete res.body.id;
    expect(res.body).toEqual({
      name: "Borracha branca",
      description: "Boa para apagar desenhos a lápis",
      type: "tools",
      count: 5,
    });
  });

  it("GET /produto should show all products", async () => {
    const res = await requestWithSupertest.get("/produto");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body.length).toEqual(3);
  });

  it("GET /produto/e0211638-e029-40d7-b06a-4921ff84691a should show product", async () => {
    const res = await requestWithSupertest.get("/produto/e0211638-e029-40d7-b06a-4921ff84691a");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({
      id: "e0211638-e029-40d7-b06a-4921ff84691a",
      name: "Borracha dupla",
      description: "Boa para apagar desenhos a lápis",
      type: "tools",
      count: 23,
    });
  });

  it("GET /produto/pesquisar/borra should show product with elasticsearch", async () => {
    const res = await requestWithSupertest.get("/produto/pesquisar/borra");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body[0].description).toEqual("Boa para apagar desenhos a lápis");
  });

  it("PUT /produto/55ed5eb2-199f-4412-9733-5d784e0215bd update all data product", async () => {
    const res = await requestWithSupertest.put("/produto/55ed5eb2-199f-4412-9733-5d784e0215bd").send({
      name: "Borracha",
      description: "Boa para apagar desenhos a lápis",
      type: "tools",
      count: 5,
    });
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({
      id: "55ed5eb2-199f-4412-9733-5d784e0215bd",
      name: "Borracha",
      description: "Boa para apagar desenhos a lápis",
      type: "tools",
      count: 5,
    });
  });

  it("PATCH /produto/55ed5eb2-199f-4412-9733-5d784e0215bd update field product", async () => {
    const res = await requestWithSupertest.patch("/produto/55ed5eb2-199f-4412-9733-5d784e0215bd").send({
      count: 12,
    });
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({
      id: "55ed5eb2-199f-4412-9733-5d784e0215bd",
      name: "Borracha",
      description: "Boa para apagar desenhos a lápis",
      type: "tools",
      count: 12,
    });
  });

  it("DELETE /produto/55ed5eb2-199f-4412-9733-5d784e0215bd delete product", async () => {
    const res = await requestWithSupertest.delete("/produto/55ed5eb2-199f-4412-9733-5d784e0215bd");
    expect(res.status).toEqual(202);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ success: "Produto apagado" });
  });
});

describe("Product Endpoints (fail)", () => {
  it("POST /produto not create product", async () => {
    const res = await requestWithSupertest.post("/produto");
    expect(res.status).toEqual(400);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Dados n\u00E3o recebido" });
  });

  it("GET /produto/55ed5eb2-199f-4412-9733-5d784e0215bd not should show product", async () => {
    const res = await requestWithSupertest.get("/produto/55ed5eb2-199f-4412-9733-5d784e0215bd");
    expect(res.status).toEqual(404);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Produto n\u00E3o encontrado" });
  });

  it("PUT /produto/55ed5eb2-199f-4412-9733-5d784e0215bd not update all data product", async () => {
    const res = await requestWithSupertest.put("/produto/55ed5eb2-199f-4412-9733-5d784e0215bd");
    expect(res.status).toEqual(404);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Produto n\u00E3o encontrado" });
  });

  it("PATCH /produto/55ed5eb2-199f-4412-9733-5d784e0215bd 404 update field product", async () => {
    const res = await requestWithSupertest.patch("/produto/55ed5eb2-199f-4412-9733-5d784e0215bd").send({
      name: "Borracha",
      description: "Boa para apagar desenhos a lápis",
      type: "tools",
      count: 5,
    });
    expect(res.status).toEqual(404);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Produto n\u00E3o encontrado" });
  });

  it("PATCH /produto/55ed5eb2-199f-4412-9733-5d784e0215bd not update field product", async () => {
    const res = await requestWithSupertest.patch("/produto/55ed5eb2-199f-4412-9733-5d784e0215bd");
    expect(res.status).toEqual(412);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Campos n\u00E3o recebidos" });
  });

  it("DELETE /produto/55ed5eb2-199f-4412-9733-5d784e0215bd not delete product", async () => {
    const res = await requestWithSupertest.delete("/produto/55ed5eb2-199f-4412-9733-5d784e0215bd");
    expect(res.status).toEqual(404);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Produto n\u00E3o encontrado" });
  });

  it("PUT /produto/e0211638-e029-40d7-b06a-4921ff84691a fail update all data third product", async () => {
    const res = await requestWithSupertest.put("/produto/e0211638-e029-40d7-b06a-4921ff84691a");
    expect(res.status).toEqual(412);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Campos n\u00E3o recebidos" });
  });

  it("PATCH /produto/e0211638-e029-40d7-b06a-4921ff84691a fail update field third product", async () => {
    const res = await requestWithSupertest.patch("/produto/e0211638-e029-40d7-b06a-4921ff84691a");
    expect(res.status).toEqual(412);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Campos n\u00E3o recebidos" });
  });

  it("GET /produto/listar should show products list page", async () => {
    const res = await requestWithSupertest.get("/produto/listar");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual("text/html");
    expect(res.text).toContain("tools");
  });

  it("GET /produto/listar/e0211638-e029-40d7-b06a-4921ff84691a should show product 2 page", async () => {
    const res = await requestWithSupertest.get("/produto/listar/e0211638-e029-40d7-b06a-4921ff84691a");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual("text/html");
    expect(res.text).toContain("Borracha dupla");
  });

  it("GET /produto/listar/55ed5eb2-199f-4412-9733-5d784e0215bf not should show product 1 page", async () => {
    const res = await requestWithSupertest.get("/produto/listar/55ed5eb2-199f-4412-9733-5d784e0215bf");
    expect(res.status).toEqual(404);
    expect(res.type).toEqual("text/html");
    expect(res.text).toContain("Produto não encontrado");
  });
});
