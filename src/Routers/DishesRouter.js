const express = require("express");
const DishesService = require("../Services/DishesService");
const DishesRouter = express.Router();
const jsonParser = express.json();
const path = require("path");
serializeDishes = (dish) => ({
  id: dish.id,
  provider_id: dish.provider_id,
  name: dish.name,
  description: dish.description,
  price: dish.price,
});

DishesRouter.route("/")

  .get((req, res, next) => {
    DishesService.getAllDishes(req.app.get("db"))
      .then((dish) => {
        res.json(dish);
      })
      .catch(next);
  })

  .post(jsonParser, (req, res, next) => {
    const { provider_id, name, description, price } = req.body;
    const newDish = { provider_id, name, description, price };
    for (const [key, value] of Object.entries(newDish)) {
      if (value == null) {
        return res
          .status(400)
          .json({ error: { message: `Missing '${key}' in request body` } });
      }
    }

    DishesService.insertDish(req.app.get("db"), newDish)
      .then((dish) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${dish.id}`))
          .json(serializeDishes(dish));
      })
      .catch(next);
  });

module.exports = DishesRouter;
