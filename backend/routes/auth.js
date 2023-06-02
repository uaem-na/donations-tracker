const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/user");

// handle login logic
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res, next) => {
    req.session.save((err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ success: "Login successful." });
    });
  }
);

// handle logout logic
router.post("/logout", (req, res, next) => {
  req.logout();
  req.session.save((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// handle sign up logic
router.post("/register", (req, res, next) => {
  const { email, firstName, lastName, organization, password } = req.body;
  User.register(
    new User({
      email,
      firstName,
      lastName,
      organization,
    }),
    req.body.password,
    (err, user) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      passport.authenticate("local")(req, res, () => {
        req.session.save((err) => {
          if (err) {
            return next(err);
          }
          return res.status(200).json({ success: "Registration successful." });
        });
      });
    }
  );
});

module.exports = router;
