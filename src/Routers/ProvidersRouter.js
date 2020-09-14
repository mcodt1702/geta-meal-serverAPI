const express = require("express");
const ProvidersService = require("../Services/ProvidersService");
const ProvidersRouter = express.Router();
const jsonParser = express.json();
const path = require("path");

serializeProvider = (provider) => ({
  id: provider.id,
  name: provider.name,
  address: provider.address,
  zip: provider.zip,
  phone: provider.phone,
  email: provider.email,
  password: provider.password,
  type: provider.type,
});

ProvidersRouter.route("/")
  .get((req, res, next) => {
    ProvidersService.getAllProviders(req.app.get("db"))
      .then((user) => {
        res.json(user.map(serializeProvider));
      })
      .catch(next);
  })

  .post(jsonParser, (req, res, next) => {
    const { name, address, zip, phone, email, password, type } = req.body;
    const newProvider = { name, address, zip, phone, email, password, type };

    for (const [key, value] of Object.entries(newProvider)) {
      if (value == null) {
        return res
          .status(400)
          .json({ error: { message: `Missing '${key}' in request body` } });
      }
    }

    ProvidersService.insertProviders(req.app.get("db"), newProvider)
      .then((provider) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${provider.id}`))
          .json(serializeConsumer(provider));
      })
      .catch(next);
  });

module.exports = ProvidersRouter;
