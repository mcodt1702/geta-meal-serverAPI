const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const { makeTestProviders } = require("./providers.fixtures");
const { makeTestDishes } = require("./dishes.fixtures");
const { makeTestOrder } = require("./orders.fixtures");
const { makeTestConsumers } = require("./consumers.fixtures");
describe("OrderItems Endpoints", function () {
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
    db.raw("TRUNCATE TABLE orders, order_items,consumers, providers CASCADE")
  );
  afterEach("clean the table", () =>
    db.raw("TRUNCATE TABLE order_items CASCADE")
  );

  context("Given there are orders in the database", () => {
    let testProviders = makeTestProviders();
    let testConsumers = makeTestConsumers();
    let testOrders = makeTestOrder();
    let testDishes = makeTestDishes();
    let testOrderItems = [
      {
        order_id: 1,
        dish_id: 1,
        qty: 1,
      },
    ];

    beforeEach("insert orders", () => {
      return db
        .into("consumers")
        .insert(testConsumers)
        .then(() =>
          db
            .into("providers")
            .insert(testProviders)
            .then(() =>
              db
                .into("dishes")
                .insert(testDishes)
                .then(() =>
                  db
                    .into("orders")
                    .insert(testOrders)
                    .then(() => db.into("order_items").insert(testOrderItems))
                )
            )
        );
    });

    it("GET /orders responds with 200 and all of the orders", () => {
      return supertest(app).get("/orderItems").expect(200);
      // TODO: add more assertions about the body
    });

    it("POST /orders responds with 401 without credentials", () => {
      return supertest(app).post("/orders").send(testOrders[0]).expect(401);

      // TODO: add more assertions about the body
    });
  });
});
