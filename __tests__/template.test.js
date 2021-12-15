const server = require("../index.js");
const supertest = require("supertest");
var fs = require("fs");
const requestWithSupertest = supertest(server);

describe("Template Endpoints", () => {
  it("GET / should show main page", async () => {
    const res = await requestWithSupertest.get("/");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("html"));
    fs.readFileSync("templates/index.ejs", "utf-8", (result) => {
      expect(res.body).toEqual(result);
    });
  });
  it("GET /shop should show 404 page", async () => {
    const res = await requestWithSupertest.get("/shop");
    expect(res.status).toEqual(404);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body.error).toEqual("N\u00E3o encontrado");
  });
  it("GET /user should show redirect page", async () => {
    const res = await requestWithSupertest.get("/user");
    expect(res.status).toEqual(302);
    expect(res.type).toEqual("text/plain");
    fs.readFileSync("templates/index.ejs", "utf-8", (result) => {
      expect(res.body).toEqual(result);
    });
  });
});
