const connectAtlasDB = require("./mongodb/connectToMongodbAtlas");
const connectToLoaclDB = require("./mongodb/connectToMongodbLocally");

const ENVIROMENT = process.env.ENVIROMENT;
const DB_SERVICE = process.env.DB_SERVICE;

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
