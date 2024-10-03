const mongoose = require("mongoose");

const mongoUrl = "mongodb://localhost:27017/varun";

mongoose.connect(mongoUrl, {
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
