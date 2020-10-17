const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const { makeTestProviders } = require("./providers.fixtures");
const { makeTestOrder } = require("./orders.fixtures");
const { makeTestConsumers } = require("./consumers.fixtures");

describe("Orders Endpoints", function () {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  beforeEach("clean the table", () =>
    db.raw(
      "TRUNCATE TABLE orders, consumers, providers RESTART IDENTITY CASCADE"
    )
  );
  afterEach("clean the table", () =>
    db.raw("TRUNCATE TABLE providers RESTART IDENTITY CASCADE")
  );

  context("Given there are orders in the database", () => {
    let testProviders = makeTestProviders();
    let testConsumers = makeTestConsumers();
    let testOrders = makeTestOrder();
    beforeEach("insert orders", () => {
      return db
        .into("consumers")
        .insert(testConsumers)
        .then(() =>
          db
            .into("providers")
            .insert(testProviders)
            .then(() => db.into("orders").insert(testOrders))
        );
    });

    it("GET /orders responds with 200 and all of the orders", () => {
      return supertest(app).get("/orders").expect(200);
      // TODO: add more assertions about the body
    });

    it("POST /orders responds with 401 without credentials", () => {
      return supertest(app).post("/orders").send(testOrders[0]).expect(401);

      // TODO: add more assertions about the body
    });
  });
});
