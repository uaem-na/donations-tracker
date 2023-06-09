const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/user");

// handle httpOnly cookie session
router.get("/session", (req, res, next) => {
  if (req.user) {
    const { admin, email, firstName, lastName, organization, verified } =
      req.user;

    // only send what's required to the frontend
    res.status(200).json({
      admin,
      email,
      firstName,
      lastName,
      organization,
      verified,
    });
  } else {
    res.status(200).json({ error: "Not logged in." });
  }
});

// handle login logic
router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failWithError: true,
  }),
  (req, res, next) => {
    req.session.save((err) => {
      if (err) {
        return next(err);
      }

      const { admin, email, firstName, lastName, organization, verified } =
        req.user;
      res
        .status(200)
        .json({ admin, email, firstName, lastName, organization, verified });
    });
  }
);

// handle logout logic
router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    // callback is required for req.logout
    if (err) {
      return next(err);
    }
  });
  req.session.save((err) => {
    if (err) {
      return next(err);
    }
    return res.status(200).json({ message: "Successfully logged out." });
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
          const { admin, email, firstName, lastName, organization, verified } =
            user;
          return res.status(200).json({
            admin,
            email,
            firstName,
            lastName,
            organization,
            verified,
          });
        });
      });
    }
  );
});

module.exports = router;
