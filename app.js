const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./DB/dbService");
const router = require("./router/router");
const corsmiddleware = require("./middlewares/cors");
const app = express();
const PORT = 8181;

app.use(express.json());
app.use(corsmiddleware);

app.use(router);

app.listen(PORT, () => {
  console.log("Server is listening to port: " + PORT);
  connectDB();
});
