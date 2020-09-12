const knex = require("knex");

const ConsumersService = {
  getAllConsumers(knex) {
    return knex.select("*").from("consumers");
  },

  insertConsumer(knex, newConsumer) {
    return knex
      .insert(newConsumer)
      .into("consumers")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
};

module.exports = ConsumersService;
