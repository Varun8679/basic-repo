const express = require("express");
const router = express.Router();

const MenuItem = require("../models/MenuItem");

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newMenu = new MenuItem(data);
    const response = await newMenu.save();
    console.log("Menu Data Received");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Data Fetched SuccessFully");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste;
    if (taste == "sweet" || taste == "spicy" || taste == "sour") {
      const response = await MenuItem.find({ taste: taste });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(500).json("Internal server error");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
});
module.exports = router;
