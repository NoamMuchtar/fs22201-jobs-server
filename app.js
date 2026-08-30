const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const connectDB = require("./DB/dbService");
const router = require("./router/router");
const corsmiddleware = require("./middlewares/cors");
const loggerMiddleware = require("./logger/loggerService");
const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(loggerMiddleware());
app.use(corsmiddleware);
app.get("/test", (req, res) => {
  console.log("GET /test received");
  res.send("Server works");
});
app.use(router);

app.listen(PORT, () => {
  console.log("Server is listening to port: " + PORT);
  connectDB();
});
