const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const passport = require("./auth");

const PORT = process.env.PORT || 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(passport.initialize());

app.use(passport.initialize());

//middleware function
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request is made to:${req.originalUrl}`
  );
  next();
};

app.use(logRequest);
const localAuthMiddleware = passport.authenticate("local", { session: false });

app.get("/", (req, res) => {
  res.send("Welcome To Backened");
});

//import router files
const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");

//use router files
app.use("/person", personRoutes);
app.use("/menu", localAuthMiddleware, menuItemRoutes);

app.listen(PORT, () => {
  console.log("listening on port 3000");
});
