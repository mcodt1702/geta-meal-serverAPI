const knex = require("knex");

const DishesService = {
  getAllDishes(knex) {
    return knex.select("*").from("dishes");
  },

  insertDish(knex, newDish) {
    return knex
      .insert(newDish)
      .into("dishes")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
};

module.exports = DishesService;
