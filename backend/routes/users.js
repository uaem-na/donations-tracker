const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
let { User } = require("../models/user");

// Get all users
router.get("/", ensureAuthenticated, (req, res) => {
  User.find({
    active: true,
  })
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send(`Error getting users.\n${err}`));
});

// Delete a user
router.delete("/:id", (req, res) => {
  console.assert(req.user, "User must be logged in to delete a user.");

  const { id } = req.params;
  if (!id) {
    res.status(400).send(`Error deleting user. User ID must be specified.\n`);
    return;
  }

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

// Get a user by ID for what?
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

// Update a user's information
router.post("/update", ensureAuthenticated, (req, res) => {
  if (!req.user) {
    res.status(401).send(`Error updating user. User must be logged in.\n`);
    return;
  }

  const { id } = req.user;

  User.findById(id)
    .then((user) => {
      const { firstName, lastName } = req.body;

      if (firstName) {
        user.firstName = firstName;
      }

      if (lastName) {
        user.lastName = lastName;
      }

      user
        .save()
        .then((user) =>
          res.status(200).json({
            admin: user.admin,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            organization: user.organization,
            verified: user.verified,
          })
        )
        .catch((err) => res.status(500).send(`Error updating user.\n${err}`));
    })
    .catch((err) => res.status(500).send(`Error updating user.\n${err}`));
});

// Update a user's password
router.post("/password", ensureAuthenticated, (req, res) => {
  if (!req.user) {
    res.status(401).send(`Error updating user. User must be logged in.\n`);
    return;
  }

  const { id } = req.user;
  const { password, confirmPassword } = req.body;

  if (!password || !confirmPassword) {
    res
      .status(400)
      .send(`Error updating user password. Passwords must be specified.\n`);
    return;
  }

  if (password !== confirmPassword) {
    res
      .status(400)
      .send(`Error updating user password. New passwords must match.\n`);
    return;
  }

  // update user's password
  User.findById(id)
    .then((user) => {
      // ! this only sets the password in model, doesn't save to db
      user.setPassword(password, (err, user, passwordErr) => {
        if (err) {
          // hashing algorithm threw an error
          res.status(500).send(`Error updating user password.\n${err}`);
        } else if (passwordErr) {
          // password failed validation
          res.status(400).send(`Error updating user password.\n${passwordErr}`);
        } else {
          // save user to db
          user
            .save()
            .then((user) =>
              res.status(200).json({
                admin: user.admin,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                organization: user.organization,
                verified: user.verified,
              })
            )
            .catch((err) =>
              res.status(500).send(`Error updating user password.\n${err}`)
            );
        }
      });
    })
    .catch((err) => res.status(500).send(`Error updating user.\n${err}`));
});

module.exports = router;
