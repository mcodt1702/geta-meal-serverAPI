const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const { makeTestProviders } = require("./providers.fixtures");
const { makeTestDishes } = require("./dishes.fixtures");

describe("Dishes Endpoints", function () {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("clean the table", () => db.raw("TRUNCATE TABLE dishes CASCADE"));
  afterEach("clean the table", () => db.raw("TRUNCATE TABLE dishes CASCADE"));

  context("Given there are dishes in the database", () => {
    let testDishes = makeTestDishes();
    let testProviders = makeTestProviders();
    beforeEach("insert dishes", () => {
      return db

        .into("providers")
        .insert(testProviders)
        .then(() => db.into("dishes").insert(testDishes));
    });

    it("GET /providers responds with 200 and all of the providers", () => {
      return supertest(app).get("/dishes").expect(200);
      // TODO: add more assertions about the body
    });
  });
});
