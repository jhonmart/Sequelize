const server = require("../src/index.js");
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
    delete res.body.id;
    expect(res.body).toEqual({
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
    expect(res.body.length).toEqual(4);
  });

  it("PUT /usuarios/UUID update all data first user", async () => {
    const res = await requestWithSupertest
      .put("/usuarios/75b68de2-575a-4c45-aaf1-880fd8e4b757")
      .send({
        name: "Jhon Martins",
        email: "jonatas.martins@mail.com",
        gender: "male",
        birthday: "1998-04-08",
        password: "a2N23_*2@nc!2022",
      });
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({
      id: "75b68de2-575a-4c45-aaf1-880fd8e4b757",
      name: "Jhon Martins",
      email: "jonatas.martins@mail.com",
      gender: "male",
      birthday: "1998-04-08T00:00:00.000Z",
    });
  });

  it("PATCH /usuarios/UUID update field first user", async () => {
    const res = await requestWithSupertest
      .patch("/usuarios/75b68de2-575a-4c45-aaf1-880fd8e4b757")
      .send({
        password: "macaco2012",
      });
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({
      id: "75b68de2-575a-4c45-aaf1-880fd8e4b757",
      name: "Jhon Martins",
      email: "jonatas.martins@mail.com",
      gender: "male",
      birthday: "1998-04-08T00:00:00.000Z",
    });
  });

  it("PATCH /usuarios/UUID update field first user", async () => {
    const res = await requestWithSupertest
      .patch("/usuarios/75b68de2-575a-4c45-aaf1-880fd8e4b757")
      .send({
        name: "Jonatas Martins",
      });
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({
      id: "75b68de2-575a-4c45-aaf1-880fd8e4b757",
      name: "Jonatas Martins",
      email: "jonatas.martins@mail.com",
      gender: "male",
      birthday: "1998-04-08T00:00:00.000Z",
    });
  });

  it("GET /usuarios/UUID should show first user", async () => {
    const res = await requestWithSupertest.get(
      "/usuarios/75b68de2-575a-4c45-aaf1-880fd8e4b757"
    );
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({
      id: "75b68de2-575a-4c45-aaf1-880fd8e4b757",
      name: "Jonatas Martins",
      gender: "male",
      birthday: "1998-04-08T00:00:00.000Z",
      email: "jonatas.martins@mail.com",
    });
  });

  it("GET /usuarios/pesquisar/ry should show user with elasticsearch", async () => {
    const res = await requestWithSupertest.get("/usuarios/pesquisar/ry");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body[0].name).toEqual("Mary");
  });

  it("DELETE /usuarios/UUID delete first user", async () => {
    const res = await requestWithSupertest.delete(
      "/usuarios/75b68de2-575a-4c45-aaf1-880fd8e4b757"
    );
    expect(res.status).toEqual(202);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ success: "Usuário apagado" });
  });
});

describe("User Endpoints (fail)", () => {
  it("POST /usuarios 400 create user", async () => {
    const res = await requestWithSupertest.post("/usuarios").send({
      name: "Jhon Mart",
      email: "jonatas.araripe@mail.com",
      gender: "male",
      birthday: "1998-04-08",
      password: "a2N23_*2@nc!2021",
    });
    expect(res.status).toEqual(400);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual(["email must be unique"]);
  });

  it("POST /usuarios/entrar 401 login invalid", async () => {
    const res = await requestWithSupertest.post("/usuarios/entrar").send({
      email: "alex.stan@mail.com",
      password: "a2N23_*2@nc!2021",
    });
    expect(res.status).toEqual(401);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({
      error: "Usuário/Senha errados",
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

  it("PUT /usuarios/UUID 404 update all data first user", async () => {
    const res = await requestWithSupertest
      .put("/usuarios/75b68de2-575a-4c45-aaf1-880fd8e4b712")
      .send({
        name: "Alex Stan",
        email: "alex.stan@mail.com",
        gender: "male",
        birthday: "1972-02-18T00:00:00.000Z",
      });
    expect(res.status).toEqual(404);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Usuário n\u00E3o encontrado" });
  });

  it("GET /usuarios/UUID 404 should show first user", async () => {
    const res = await requestWithSupertest.get(
      "/usuarios/75b68de2-575a-4c45-aaf1-880fd8e4b712"
    );
    expect(res.status).toEqual(404);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Usuário n\u00E3o encontrado" });
  });

  it("DELETE /usuarios/UUID 404 delete first user", async () => {
    const res = await requestWithSupertest.delete(
      "/usuarios/75b68de2-575a-4c45-aaf1-880fd8e4b712"
    );
    expect(res.status).toEqual(404);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Usuário n\u00E3o encontrado" });
  });

  it("PUT /usuarios/UUID 400 update all data second user", async () => {
    const res = await requestWithSupertest.put(
      "/usuarios/377b95f9-1bf2-46e8-ba59-5d017740c9ed"
    );
    expect(res.status).toEqual(412);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Campos n\u00E3o recebidos" });
  });

  it("PATCH /usuarios/UUID 404 update field first user", async () => {
    const res = await requestWithSupertest
      .patch("/usuarios/75b68de2-575a-4c45-aaf1-880fd8e4b757")
      .send({
        name: "Alex Stan",
      });
    expect(res.status).toEqual(404);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Usuário n\u00E3o encontrado" });
  });

  it("PUT /usuarios/UUID 404 update all data first user", async () => {
    const res = await requestWithSupertest
      .put("/usuarios/75b68de2-575a-4c45-aaf1-880fd8e4b757")
      .send({
        name: "Alex Stan",
        email: "alex.stan@mail.com",
        gender: "male",
        birthday: "1972-02-18T00:00:00.000Z",
      });
    expect(res.status).toEqual(404);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Usuário n\u00E3o encontrado" });
  });

  it("PATCH /usuarios/UUID 412 update field first user", async () => {
    const res = await requestWithSupertest.patch(
      "/usuarios/75b68de2-575a-4c45-aaf1-880fd8e4b757"
    );
    expect(res.status).toEqual(412);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Campos n\u00E3o recebidos" });
  });
});
