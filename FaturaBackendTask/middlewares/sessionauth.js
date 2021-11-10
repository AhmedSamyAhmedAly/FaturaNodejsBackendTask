const session = require("express-session");

//check for the session

module.exports = (req, res, next) => {
  if (req.session.user && req.cookies["connect.sid"]) return next();
  else return res.status(401).send({ error: " Session Access Denied" });
};
