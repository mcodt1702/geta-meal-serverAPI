const app = require("../src/app");

describe("App", () => {
  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app).get("/").expect(200, "Hello geta-meal!");
  });
});

describe("providers", () => {
  it("GET / responds with 200", () => {
    return supertest(app).get("/providers").expect(200);
  });
});

describe("consumers", () => {
  it("GET / responds with 200", () => {
    return supertest(app).get("/providers").expect(200);
  });
});

describe("login", () => {
  it("GET / responds with 200", () => {
    return supertest(app).get("/login").expect(404);
  });
});

describe("dishes", () => {
  it(`responds 401 'Unauthorized request' when no credentials in token`, () => {
    const userNoCreds = { user_name: "", password: "" };
    return supertest(app)
      .get(`/api/articles/123`)
      .set("Authorization", makeAuthHeader(userNoCreds))
      .expect(401, { error: `Unauthorized request` });
  });

  it("GET / responds with 200", () => {
    return supertest(app).get("/dishes").expect(200);
  });
});
