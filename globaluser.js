module.exports = async (req, res, next) => {
  res.locals.user = req.user;
  res.locals.roles = ["Banned", "User", "Instructor", "Administrator"];
  res.locals.statuses = ["Waiting for payment", "Enlisted", "Completed"];
  res.locals.message = req.flash();
  next();
};