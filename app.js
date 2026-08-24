const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./DB/dbService");
const router = require("./router/router");
const corsmiddleware = require("./middlewares/cors");
const loggerMiddleware = require("./logger/loggerService");
const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(loggerMiddleware);

app.use(corsmiddleware);

app.use(router);

app.listen(PORT, () => {
  console.log("Server is listening to port: " + PORT);
  connectDB();
});
