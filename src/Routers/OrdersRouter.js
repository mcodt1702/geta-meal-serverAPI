const express = require("express");
const OrdersService = require("../Services/OrdersService");
const OrdersRouter = express.Router();
const jsonParser = express.json();
const path = require("path");
const { serialize } = require("v8");

serializeOrders = (order) => ({
  id: order.id,
  provider_id: order.provider_id,
  consumer_id: order.consumer_id,
  created: order.created,
  status: order.status,
});

OrdersRouter.route("/")
  .get((req, res, next) => {
    OrdersService.getAllOrders(req.app.get("db"))
      .then((dish) => {
        res.json(dish.map(serializeOrders));
      })
      .catch(next);
  })

  .post(jsonParser, (req, res, next) => {
    const { provider_id, consumer_id, status } = req.body;
    const newOrder = { provider_id, consumer_id, status };
    for (const [key, value] of Object.entries(newOrder)) {
      if (value == null) {
        return res
          .status(400)
          .json({ error: { message: `Missing '${key}' in request body` } });
      }
    }

    OrdersService.insertOrders(req.app.get("db"), newOrder)
      .then((order) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${order.id}`))
          .json(serializeOrders(order));
      })
      .catch(next);
  });

module.exports = OrdersRouter;
