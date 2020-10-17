const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const { makeTestConsumers } = require("./consumers.fixtures");

describe("Consumers Endpoints", function () {
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
    db.raw("TRUNCATE TABLE consumers RESTART IDENTITY CASCADE")
  );
  afterEach("clean the table", () =>
    db.raw("TRUNCATE TABLE consumers RESTART IDENTITY CASCADE")
  );

  context("Given there are consumers in the database", () => {
    let testConsumers = makeTestConsumers();
    beforeEach("insert consumers", () => {
      return db.into("consumers").insert(testConsumers);
    });

    it("GET /consumers responds with 200 and all of the consumers", () => {
      return supertest(app).get("/consumers").expect(200);
      // TODO: add more assertions about the body
    });

    it("POST /consumers responds with 201 and the new provider", () => {
      return supertest(app)
        .post("/consumers")
        .send(testConsumers[0])
        .expect(201)
        .then((res) => {
          expect(res.body.name).to.eql(testConsumers[0].name);
        });
      // TODO: add more assertions about the body
    });
  });
});
