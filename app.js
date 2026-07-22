const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./DB/dbService");

const app = express();
const PORT = 8181;

app.use(express.json());

app.listen(PORT, () => {
  console.log("Server is listening to port: " + PORT);
  connectDB();
});
