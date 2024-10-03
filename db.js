const mongoose = require("mongoose");

require("dotenv").config();

// const mongoUrL = process.env.MONGODB_URL_LOCAL";
const mongoUrL = process.env.MONGODB_URL;

mongoose.connect(mongoUrL, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("disconnected", () => {
  console.log("MongoDB is disconnected");
});

db.on("connected", () => {
  console.log("MongoDB is connected");
});

db.on("error", (err) => {
  console.log("MongoDB connection error", err);
});

module.exports = db;
