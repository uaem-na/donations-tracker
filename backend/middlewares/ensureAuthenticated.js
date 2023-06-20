const ensureAuthenticated = (req, res, next) => {
  if (req.user) {
    return next();
  }

  const error = new Error("Unauthorized");
  error.status = 401;
  next(error);
};

module.exports = ensureAuthenticated;
