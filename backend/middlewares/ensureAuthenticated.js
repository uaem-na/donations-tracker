const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json("Unauthorized.");
};

module.exports = ensureAuthenticated;
