const express = require("express");
const OrderItemsService = require("../Services/OrderItemsService");
const OrderItemsRouter = express.Router();
const jsonParser = express.json();
const path = require("path");
const { serialize } = require("v8");
const { json } = require("express");

serializeOrderItems = (orderItems) => ({
  id: orderItems.id,
  order_id: orderItems.order_id,
  dish_id: orderItems.dish_id,
  qty: orderItems.qty,
});

OrderItemsRouter.route("/")
  .get((req, res, next) => {
    OrderItemsService.getAllOrderItems(req.app.get("db"))
      .then((orderItem) => {
        res.json(orderItem.map(serializeOrderItems));
      })
      .catch(next);
  })

  .post(jsonParser, (req, res, next) => {
    const { order_id, dish_id, qty } = req.body;
    const newOrderItem = { order_id, dish_id, qty };

    for (const [key, value] of Object.entries(newOrderItem)) {
      if (value == null) {
        return res
          .status(400)
          .json({ error: { message: `Missing '${key}' in request body` } });
      }
    }
    OrderItemsService.insertOrderItems(req.app.get("db"), newOrderItem)

      .then((newOrderItem) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${newOrderItem.id}`))
          .json(serializeOrderItems(newOrderItem));
      })
      .catch(next);
  });

module.exports = OrderItemsRouter;
