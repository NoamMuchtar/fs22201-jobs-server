const connectAtlasDB = require("./mongodb/connectToMongodbAtlas");
const connectToLoaclDB = require("./mongodb/connectToMongodbLocally");

const ENVIROMENT = "development";
const DB_SERVICE = "mongodb";

const connectDB = async () => {
  if (DB_SERVICE === "mongodb") {
    if (ENVIROMENT === "development") {
      await connectToLoaclDB();
    }
    if (ENVIROMENT === "production") {
      await connectAtlasDB();
    }
  }

  //   if (DB_SERVICE === "sql"){
  //     ...
  //   }
};

module.exports = connectDB;
