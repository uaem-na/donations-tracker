const ensureAuthenticated = (req, res, next) => {
  if (req.user) {
    return next();
  }

  const error: any = new Error("Unauthorized");
  error.status = 401;
  next(error);
};

module.exports = ensureAuthenticated;
