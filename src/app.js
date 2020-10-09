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
const authRouter = require("./Routers/auth-router");
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello geta-meal!");
});
app.use("/login", authRouter);
app.use("/orderItems", OrderItemsRouter);
app.use("/orders", OrdersRouter);
app.use("/dishes", DishesRouter);
app.use("/providers", ProvidersRouter);
app.use("/consumers", ConsumersRouter);

app.use((error, req, res, next) => {
  let response;
  if (process.env.NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    response = { error };
  }
  console.log(error);
  res.status(500).json(response);
});

module.exports = app;
