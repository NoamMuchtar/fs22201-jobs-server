const mongoose = require("mongoose");

const CONNECTION_STRING = process.env.ATLAS_CONNECTION_STRING;

const connectAtlasDB = async () => {
  try {
    await mongoose.connect(CONNECTION_STRING);
    console.log("Connect to MongoDB in Atlas");
  } catch (error) {
    console.log("Could not connect MongoDB Atlas", error.message);
  }
};

module.exports = connectAtlasDB;
