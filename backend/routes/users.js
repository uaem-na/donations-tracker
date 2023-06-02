const express = require("express");
const router = express.Router();
let { User } = require("../models/user");

router.get("/", (req, res) => {
  User.find()
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send(`Error getting users.\n${err}`));
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  if (id == undefined || id == "") {
    res.status(400).send(`Error deleting user. User ID must be specified.\n`);
    return;
  }
  User.deleteOne({ _id: id }, (err, result) => {
    if (err) {
      result.status(500).send(`Error deleting user ${id}.\n${err}`);
    } else if (result.n == 0) {
      result
        .status(400)
        .send(`Error deleting user ${id}.\nUser does not exist.\n`);
    } else if (result.deletedCount == 0) {
      result.status(500).send(`Error deleting user ${id}.\n`);
    } else {
      res.send(result);
    }
  });
});

router.get("/:id", (req, res) => {
  let errorMsg = "";
  const id = req.params.id;

  if (id == undefined || id == "") {
    errorMsg += "Error fetching user.\nUser ID must be defined.\n";
    res.status(400).send(errorMsg);
    return;
  }

  User.findById(id, (err, result) => {
    if (result == null) {
      errorMsg += "Error fetching user.\nUser not found.\n";
      res.status(400).send(errorMsg);
    } else if (err) {
      errorMsg += "Error fetching user.\n";
      res.status(500).send(errorMsg);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
