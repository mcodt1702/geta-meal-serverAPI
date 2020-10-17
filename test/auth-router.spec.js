const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const { makeTestConsumers } = require("./consumers.fixtures");
const { makeTestProviders } = require("./providers.fixtures");
const jwt = require("jsonwebtoken");

describe("Auth-Router Endpoints", function () {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("clean the table", () => db.raw("TRUNCATE TABLE providers CASCADE"));
  afterEach("clean the table", () =>
    db.raw("TRUNCATE TABLE providers CASCADE")
  );
  context("Given there are valid credential", () => {
    const testProviders = makeTestProviders();

    beforeEach("insert providers", () => {
      return db.into("providers").insert(testProviders);
    });
    it(`responds 200 and JWT auth token using secret when valid credentials`, () => {
      const userValidCreds = {
        email: testProviders[0].email,
        password: "joe33",
        user_type: "provider",
      };

      return supertest(app).post("/login").send(userValidCreds).expect(200);
    });
  });
});
