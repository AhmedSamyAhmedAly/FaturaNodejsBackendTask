const express = require("express");
const router = express.Router();
const User = require("../routers_helpers/UserRoutersHelper");
const jwtauth = require("../middlewares/jwtauth");
const sessionauth = require("../middlewares/sessionauth");
const roles = require("../middlewares/userRoles");
const validate = require("../middlewares/reqBodyValidator");

// get loggedin user
router.get(
  "/loginUser",
  jwtauth,
  sessionauth,
  roles.grantAccess("readOwn", "profile"),
  User.getUserById
);

// register
router.post(
  "/register",
  validate.registerValidationRules(),
  validate.validation,
  User.addUser
);

// login
router.post(
  "/login",
  validate.LoginValidationRules(),
  validate.validation,
  User.login
);

// logout
router.get("/logout", jwtauth, sessionauth, User.logout);

/// get all users
router.get(
  "/",
  jwtauth,
  sessionauth,
  roles.grantAccess("readAny", "profile"),
  User.getUsers
);

// update user
router.patch(
  "/",
  jwtauth,
  sessionauth,
  roles.grantAccess("updateOwn", "profile"),
  User.updateUser
);

// delete user
router.delete(
  "/",
  jwtauth,
  sessionauth,
  roles.grantAccess("deleteOwn", "profile"),
  User.DeleteUser
);

//update user by id
router.patch(
  "/:id",
  jwtauth,
  sessionauth,
  roles.grantAccess("updateAny", "profile"),
  User.updateUser
);

// get  user by id
router.get(
  "/:id",
  jwtauth,
  sessionauth,
  roles.grantAccess("readAny", "profile"),
  User.getUserById
);

// delete user by id
router.delete(
  "/:id",
  jwtauth,
  sessionauth,
  roles.grantAccess("deleteAny", "profile"),
  User.DeleteUser
);

module.exports = router;
