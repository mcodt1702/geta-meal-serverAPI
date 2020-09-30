require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const app = express();
const morganOption = NODE_ENV === "production" ? "tiny" : "common";
const ProvidersRouter = require("./Routers/ProvidersRouter");
const ConsumersRouter = require("./Routers/ConsumersRouter");
const DishesRouter = require("./Routers/DishesRouter");
const OrdersRouter = require("./Routers/OrdersRouter");
const OrderItemsRouter = require("./Routers/OrderItemsRouter");
const { requireAuth } = require("./middleware/basic-auth");
const authRouter = require("./Routers/auth-router");
app.use(morgan(morganOption));
app.use(helmet());
app.all(requireAuth);
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello I'm geta-meal!");
});
app.use("/api/auth", authRouter);
app.use("/orderItems", OrderItemsRouter);
app.use("/orders", OrdersRouter);
app.use("/dishes", DishesRouter);
app.use("/providers", ProvidersRouter);
app.use("/consumers", ConsumersRouter);

// app.use(function errorHandler(error, req, res, next) {
//   let response;
//   if (NODE_ENV === "production") {
//     response = { error: { message: "server error" } };
//   } else {
//     console.error(error);
//     response = { message: error.message, error };
//   }
//   res.status(500).json(response);
// });

module.exports = app;
