const mongoose = require("mongoose");

const CONNECTION_STRING = "mongodb://localhost:27017/jobServer";

const connectToLoaclDB = async () => {
  try {
    await mongoose.connect(CONNECTION_STRING);
    console.log("Connect to MongoDB locally");
  } catch (error) {
    console.log("Could not connect MongoDB locally", error.message);
  }
};

module.exports = connectToLoaclDB;
