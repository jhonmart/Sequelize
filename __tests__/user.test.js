const server = require("../index.js");
const supertest = require("supertest");
const requestWithSupertest = supertest(server);

describe("User Endpoints (success)", () => {
  it("POST /usuarios create user", async () => {
    const res = await requestWithSupertest.post("/usuarios").send({
      name: "Jhon Mart",
      email: "jonatas.araripe@mail.com",
      gender: "male",
      birthday: "1998-04-08",
      password: "a2N23_*2@nc!2021",
    });
    expect(res.status).toEqual(201);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({
      id: 1,
      name: "Jhon Mart",
      email: "jonatas.araripe@mail.com",
      gender: "male",
      birthday: "1998-04-08T00:00:00.000Z",
    });
  });

  it("POST /usuarios/entrar login valid", async () => {
    const res = await requestWithSupertest.post("/usuarios/entrar").send({
      email: "jonatas.araripe@mail.com",
      password: "a2N23_*2@nc!2021",
    });
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({
      success: "Ok",
      token: "",
    });
  });

  it("GET /usuarios should show all users", async () => {
    const res = await requestWithSupertest.get("/usuarios");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body.length).toEqual(1);
  });

  it("GET /usuarios/1 should show first user", async () => {
    const res = await requestWithSupertest.get("/usuarios/1");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({
      id: 1,
      name: "Jhon Mart",
      email: "jonatas.araripe@mail.com",
      gender: "male",
      birthday: "1998-04-08T00:00:00.000Z",
    });
  });

  it("PUT /usuarios/1 update all data first user", async () => {
    const res = await requestWithSupertest.put("/usuarios/1").send({
      name: "Jhon Martins",
      email: "jonatas.martins@mail.com",
      gender: "male",
      birthday: "1998-04-08",
      password: "a2N23_*2@nc!2022",
    });
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({
      id: 1,
      name: "Jhon Martins",
      email: "jonatas.martins@mail.com",
      gender: "male",
      birthday: "1998-04-08T00:00:00.000Z",
    });
  });

  it("PATCH /usuarios/1 update field first user", async () => {
    const res = await requestWithSupertest.patch("/usuarios/1").send({
      name: "Jonatas Martins",
    });
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({
      id: 1,
      name: "Jonatas Martins",
      email: "jonatas.martins@mail.com",
      gender: "male",
      birthday: "1998-04-08T00:00:00.000Z",
    });
  });

  it("DELETE /usuarios/1 delete first user", async () => {
    const res = await requestWithSupertest.delete("/usuarios/1");
    expect(res.status).toEqual(202);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ success: "Usuário apagado" });
  });
});

describe("User Endpoints (fail)", () => {
  it("POST /usuarios create second user", async () => {
    const res = await requestWithSupertest.post("/usuarios").send({
      name: "Alex Stan",
      email: "alex.stan@mail.com",
      gender: "male",
      birthday: "1972-02-18",
      password: "ahsd&2h1c*@",
    });
    expect(res.status).toEqual(201);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({
      id: 2,
      name: "Alex Stan",
      email: "alex.stan@mail.com",
      gender: "male",
      birthday: "1972-02-18T00:00:00.000Z",
    });
  });

  it("POST /usuarios/entrar 401 login valid", async () => {
    const res = await requestWithSupertest.post("/usuarios/entrar").send({
      email: "alex.stan@mail.com",
      password: "a2N23_*2@nc!2021",
    });
    expect(res.status).toEqual(401);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({
      error: "Usuário/Senha errados"
    });
  });

  it("POST /usuarios fail create user", async () => {
    const res = await requestWithSupertest.post("/usuarios");
    expect(res.status).toEqual(400);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Campos n\u00E3o recebidos" });
  });

  it("POST /usuarios/entrar fail login valid", async () => {
    const res = await requestWithSupertest.post("/usuarios/entrar");
    expect(res.status).toEqual(400);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Campos n\u00E3o recebidos" });
  });

  it("PUT /usuarios/1 404 update all data first user", async () => {
    const res = await requestWithSupertest.put("/usuarios/1").send({
      name: "Alex Stan",
      email: "alex.stan@mail.com",
      gender: "male",
      birthday: "1972-02-18T00:00:00.000Z",
    });
    expect(res.status).toEqual(404);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Usuário n\u00E3o encontrado" });
  });

  it("GET /usuarios/1 404 should show first user", async () => {
    const res = await requestWithSupertest.get("/usuarios/1");
    expect(res.status).toEqual(404);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Usuário n\u00E3o encontrado" });
  });

  it("DELETE /usuarios/1 404 delete first user", async () => {
    const res = await requestWithSupertest.delete("/usuarios/1");
    expect(res.status).toEqual(404);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Usuário n\u00E3o encontrado" });
  });

  it("PUT /usuarios/2 400 update all data first user", async () => {
    const res = await requestWithSupertest.put("/usuarios/2");
    expect(res.status).toEqual(412);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Campos n\u00E3o recebidos" });
  });

  it("PATCH /usuarios/1 404 update field first user", async () => {
    const res = await requestWithSupertest.patch("/usuarios/1").send({
      name: "Alex Stan"
    });
    expect(res.status).toEqual(404);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Usuário n\u00E3o encontrado" });
  });

  it("PUT /usuarios/1 404 update all data first user", async () => {
    const res = await requestWithSupertest.put("/usuarios/1").send({
      name: "Alex Stan",
      email: "alex.stan@mail.com",
      gender: "male",
      birthday: "1972-02-18T00:00:00.000Z",
    });
    expect(res.status).toEqual(404);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Usuário n\u00E3o encontrado" });
  });

  it("PATCH /usuarios/1 412 update field first user", async () => {
    const res = await requestWithSupertest.patch("/usuarios/1");
    expect(res.status).toEqual(412);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Campos n\u00E3o recebidos" });
  });
});