const app = require("../src/app");
const { expect } = require("chai");
const knex = require("knex");

describe("App", () => {
  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app).get("/").expect(200, "Hello geta-meal!");
  });
});

describe("Geta Meal Endpoints", function () {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("clean the table", () => db("consumers").truncate());

  context("Given there are articles in the database", () => {
    const testConsumers = [
      {
        id: 1,
        name: "test",
        address: "1212 First test post!",
        zip: "11103",
        phone: 321 - 555 - 555,
        email: "he@gmail.com",
        password: "P@ssword1234",
      },
      {
        id: 2,
        name: "test2",
        address: "1212 First test post!",
        zip: "11103",
        phone: 321 - 555 - 555,
        email: "he@gmail.com",
        password: "P@ssword1234",
      },
      {
        id: 3,
        name: "test3",
        address: "1212 First test post!",
        zip: "11103",
        phone: 321 - 555 - 555,
        email: "he@gmail.com",
        password: "P@ssword1234",
      },
    ];

    beforeEach("insert articles", () => {
      return db.into("consumers").insert(testConsumers);
    });
  });
});

it("GET / responds with 200", () => {
  return supertest(app).get("/consumers").expect(200);
});
