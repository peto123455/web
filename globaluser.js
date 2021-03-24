module.exports = async (req, res, next) => {
  res.locals.user = req.user;
  res.locals.roles = ["Banned", "User", "Moderator", "Administrator"];
  
  next();
};