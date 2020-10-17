const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const { makeTestProviders } = require("./providers.fixtures");

describe("Providers Endpoints", function () {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("clean the table", () =>
    db.raw("TRUNCATE TABLE providers RESTART IDENTITY CASCADE")
  );
  afterEach("clean the table", () =>
    db.raw("TRUNCATE TABLE providers RESTART IDENTITY CASCADE")
  );

  context("Given there are providers in the database", () => {
    let testProviders = makeTestProviders();
    beforeEach("insert providers", () => {
      return db.into("providers").insert(testProviders);
    });

    it("GET /providers responds with 200 and all of the providers", () => {
      return supertest(app).get("/providers").expect(200);
      // TODO: add more assertions about the body
    });

    it("POST /providers responds with 201 and the new provider", () => {
      return supertest(app)
        .post("/providers")
        .send(testProviders[0])
        .expect(201)
        .then((res) => {
          expect(res.body.name).to.eql(testProviders[0].name);
        });
      // TODO: add more assertions about the body
    });
  });
});
