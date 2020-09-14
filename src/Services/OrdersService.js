const knex = require("knex");

const OrdersService = {
  getAllOrders(knex) {
    return knex.select("*").from("orders");
  },

  insertOrders(knex, newOrder) {
    return knex
      .insert(newOrder)
      .into("orders")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
};

module.exports = OrdersService;
