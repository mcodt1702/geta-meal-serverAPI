const knex = "knex";

const OrderItemsService = {
  getAllOrderItems(knex) {
    return knex.select("*").from("order_items");
  },

  insertOrderItems(knex, newOrderItem) {
    return knex
      .insert(newOrderItem)
      .into("order_items")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
};

module.exports = OrderItemsService;
