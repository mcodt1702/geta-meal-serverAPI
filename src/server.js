const express = require("express");
const app = express();
const cors = require("cors");
const { CLIENT_ORIGIN } = require("./config");

const PORT = process.env.PORT || 3000;

app.get("/api/*", (req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.use(
  cors({
    origin: CLIENT_ORIGIN,
  })
);
module.exports = { app };
