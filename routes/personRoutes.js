const express = require("express");
const router = express.Router();
const person = require("../models/person");

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newPerson = new person(data);

    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await person.find();
    console.log("Data Fetched SuccessFully");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:worktype", async (req, res) => {
  try {
    const worktype = req.params.worktype;
    if (worktype == "chef" || worktype == "manager" || worktype == "waiter") {
      const response = await person.find({ work: worktype });
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

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!response) {
      return res.status(400).json({ error: "person is not exist" });
    }
    console.log("Person updated successfully");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(400).json({ error: "person is not exist" });
    }
    console.log("data deleted");
    res.status(200).json("person deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
});

module.exports = router;
