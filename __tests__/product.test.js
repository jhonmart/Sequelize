const server = require("../index.js");
const supertest = require("supertest");
const requestWithSupertest = supertest(server);

describe("Product Endpoints (success)", () => {
  it("POST /produtos create product", async () => {
    const res = await requestWithSupertest.post("/produtos").send({
      name: "Borracha",
      description: "Boa para apagar desenhos a lápis",
      type: "tools",
      count: 5,
    });
    expect(res.status).toEqual(201);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({
      id: 1,
      name: "Borracha",
      description: "Boa para apagar desenhos a lápis",
      type: "tools",
      count: 5,
    });
  });

  it("GET /produtos should show all products", async () => {
    const res = await requestWithSupertest.get("/produtos");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body.length).toEqual(1);
  });

  it("GET /produtos/1 should show first product", async () => {
    const res = await requestWithSupertest.get("/produtos/1");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({
      id: 1,
      name: "Borracha",
      description: "Boa para apagar desenhos a lápis",
      type: "tools",
      count: 5,
    });
  });

  it("PUT /produtos/1 update all data first product", async () => {
    const res = await requestWithSupertest.put("/produtos/1").send({
      name: "Borracha",
      description: "Boa para apagar desenhos a lápis",
      type: "tools",
      count: 5,
    });
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({
      id: 1,
      name: "Borracha",
      description: "Boa para apagar desenhos a lápis",
      type: "tools",
      count: 5,
    });
  });

  it("PATCH /produtos/1 update field first product", async () => {
    const res = await requestWithSupertest.patch("/produtos/1").send({
      count: 12,
    });
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({
      id: 1,
      name: "Borracha",
      description: "Boa para apagar desenhos a lápis",
      type: "tools",
      count: 12,
    });
  });

  it("DELETE /produtos/1 delete first product", async () => {
    const res = await requestWithSupertest.delete("/produtos/1");
    expect(res.status).toEqual(202);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ success: "Produto apagado" });
  });
});

describe("Product Endpoints (fail)", () => {
  it("POST /produtos not create product", async () => {
    const res = await requestWithSupertest.post("/produtos");
    expect(res.status).toEqual(400);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Dados n\u00E3o recebido" });
  });

  it("GET /produtos/2 not should show first product", async () => {
    const res = await requestWithSupertest.get("/produtos/2");
    expect(res.status).toEqual(404);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Produto n\u00E3o encontrado" });
  });

  it("PUT /produtos/2 not update all data first product", async () => {
    const res = await requestWithSupertest.put("/produtos/2");
    expect(res.status).toEqual(404);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Produto n\u00E3o encontrado" });
  });

  it("PATCH /produtos/2 404 update field second product", async () => {
    const res = await requestWithSupertest.patch("/produtos/2").send({
      name: "Borracha",
      description: "Boa para apagar desenhos a lápis",
      type: "tools",
      count: 5,
    });
    expect(res.status).toEqual(404);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Produto n\u00E3o encontrado" });
  });

  it("PATCH /produtos/2 not update field second product", async () => {
    const res = await requestWithSupertest.patch("/produtos/2");
    expect(res.status).toEqual(412);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Campos n\u00E3o recebidos" });
  });

  it("DELETE /produtos/2 not delete second product", async () => {
    const res = await requestWithSupertest.delete("/produtos/2");
    expect(res.status).toEqual(404);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Produto n\u00E3o encontrado" });
  });

  it("POST /produtos create second product", async () => {
    const res = await requestWithSupertest.post("/produtos").send({
      name: "Lapis",
      description: "Bom para escrita",
      type: "tools",
      count: 12,
    });
    expect(res.status).toEqual(201);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({
      id: 2,
      name: "Lapis",
      description: "Bom para escrita",
      type: "tools",
      count: 12,
    });
  });

  it("PUT /produtos/2 fail update all data second product", async () => {
    const res = await requestWithSupertest.put("/produtos/2");
    expect(res.status).toEqual(412);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Campos n\u00E3o recebidos" });
  });

  it("PATCH /produtos/2 fail update field second product", async () => {
    const res = await requestWithSupertest.patch("/produtos/2");
    expect(res.status).toEqual(412);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Campos n\u00E3o recebidos" });
  });

  it("GET /produtos/listar should show products list page", async () => {
    const res = await requestWithSupertest.get("/produtos/listar");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual("text/html");
    expect(res.text).toContain("tools");
  });

  it("GET /produtos/listar/2 should show product 2 page", async () => {
    const res = await requestWithSupertest.get("/produtos/listar/2");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual("text/html");
    expect(res.text).toContain("Lapis");
  });

  it("GET /produtos/listar/1 not should show product 1 page", async () => {
    const res = await requestWithSupertest.get("/produtos/listar/1");
    expect(res.status).toEqual(404);
    expect(res.type).toEqual("text/html");
    expect(res.text).toContain("Produto não encontrado");
  });
});
