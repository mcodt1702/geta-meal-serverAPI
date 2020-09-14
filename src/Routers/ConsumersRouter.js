const express = require("express");
const ConsumersService = require("../Services/ConsumersService");
const ConsumerRouter = express.Router();
const jsonParser = express.json();
const path = require("path");

serializeConsumer = (consumer) => ({
  id: consumer.id,
  name: consumer.name,
  address: consumer.address,
  zip: consumer.zip,
  phone: consumer.phone,
  email: consumer.email,
  password: consumer.password,
});

ConsumerRouter.route("/")
  .get((req, res, next) => {
    ConsumersService.getAllConsumers(req.app.get("db"))
      .then((consumer) => {
        res.json(consumer.map(serializeConsumer));
      })
      .catch(next);
  })

  .post(jsonParser, (req, res, next) => {
    const { name, address, zip, phone, email, password } = req.body;
    const newConsumer = { name, address, zip, phone, email, password };

    for (const [key, value] of Object.entries(newConsumer)) {
      if (value == null) {
        return res
          .status(400)
          .json({ error: { message: `Missing '${key}' in request body` } });
      }
    }

    ConsumersService.insertConsumer(req.app.get("db"), newConsumer)
      .then((consumer) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${consumer.id}`))
          .json(serializeConsumer(consumer));
      })
      .catch(next);
  });

module.exports = ConsumerRouter;
