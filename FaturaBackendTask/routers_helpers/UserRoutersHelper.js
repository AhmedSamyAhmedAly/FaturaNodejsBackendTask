const bcrypt = require("bcrypt");
const Blacklist = require("../helper/TokenBlackList");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const mongoose = require("mongoose");

//////////////////////////////////////////////////////////////////////////////////

// get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users) return res.send(users);
    else return res.status(404).send("something went wrong");
  } catch (err) {
    res.send(err);
  }
};

//////////////////////////////////////////////////////////////////////////////////

// get user by id
exports.getUserById = async (req, res) => {
  const loggedInID =
    req.params.id != null && req.params.id != undefined
      ? req.params.id
      : req.user._id;
  try {
    //check if the id is valid
    var isValid = mongoose.Types.ObjectId.isValid(loggedInID);
    if (!isValid) return res.status(401).send("This user id is not valid");

    //check if user id is exist in DB
    const user = await User.findById(loggedInID);
    if (user) return res.send(user);
    else return res.status(404).send("This user id is not exist");
  } catch (err) {
    res.send(err);
  }
};
//////////////////////////////////////////////////////////////////////////////////

//create new user
exports.addUser = async (req, res) => {
  //check if email register before
  let isUser = await User.findOne({ email: req.body.email });
  if (isUser) return res.status(400).send("This email already registered");

  const newUser = req.body;
  // create new user
  let role =
    newUser.role != undefined && newUser.role != null ? newUser.role : "user";
  const user = new User({
    email: newUser.email.toLowerCase(),
    username: newUser.username,
    password: newUser.password,
    role: role.toLowerCase(),
  });
  //hashing password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  //save new user
  try {
    await user.save();
    return res.send({ message: "user was registered successfully" });
  } catch (err) {
    res.send({ error: err });
  }
};

//////////////////////////////////////////////////////////////////////////////////

// update user
exports.updateUser = async (req, res) => {
  const loggedInID =
    req.params.id != undefined && req.params.id != null
      ? req.params.id
      : req.user._id;

  //check if the id is valid
  var isValid = mongoose.Types.ObjectId.isValid(loggedInID);
  if (!isValid) return res.status(401).send("This user id is not valid");

  //check if user id is exist in DB
  let user = await User.findById(loggedInID);
  if (!user) return res.send({ message: "This user id is not exist" });

  const updatedUser = req.body;
  /// if user send new password
  if (updatedUser.password != undefined && updatedUser.password != null) {
    //// hashing password
    const salt = await bcrypt.genSalt(10);
    updatedUser.password = await bcrypt.hash(updatedUser.password, salt);
  }
  // validationg the update body
  let updates = {
    email:
      updatedUser.email != "" && updatedUser.email != null
        ? updatedUser.email.toLowerCase()
        : user.email.toLowerCase(),
    username:
      updatedUser.username != "" && updatedUser.username != null
        ? updatedUser.username
        : user.username,
    password:
      updatedUser.password != "" && updatedUser.password != null
        ? updatedUser.password
        : user.password,
    role:
      updatedUser.role != undefined && updatedUser.role != null
        ? updatedUser.role.toLowerCase()
        : user.role.toLowerCase(),
  };
  try {
    user = await User.findByIdAndUpdate(loggedInID, updates, {
      new: true,
    });
    if (user)
      return res.send({ message: "user was edited successfully", user: user });
  } catch (err) {
    return res.send(err);
  }
};

//////////////////////////////////////////////////////////////////////////////////

// delete user
exports.DeleteUser = async (req, res) => {
  const loggedInID =
    req.params.id != undefined && req.params.id != null
      ? req.params.id
      : req.user._id;
  try {
    //check if the id is valid
    var isValid = mongoose.Types.ObjectId.isValid(loggedInID);
    if (!isValid) return res.status(401).send("This user id is not valid");

    //check if user id is exist in DB
    const user = await User.findById(loggedInID);
    if (!user)
      return res.status(404).send({ message: "the user ID is not exist" });
    console.log(user);
    await User.deleteOne(user._id);
    return res.status(200).send({ message: "the user deleted successfully" });
  } catch (err) {
    return res.send(err);
  }
};
//////////////////////////////////////////////////////////////////////////////////

// logout
exports.logout = async (req, res) => {
  console.log("aaaaaaaaaaaaaa");
  const token = req.token;
  /// invalidate token by adding it to blacklist
  (await Blacklist).add(token);

  // invalidate session token by destroy it and clear cookie
  res.clearCookie("user");

  req.session.destroy((err) => {
    if (err) {
      return res.send(err);
    }
    res.send("Loggedout successfully");
  });
};

//////////////////////////////////////////////////////////////////////////////////
// login
exports.login = async (req, res) => {
  //check if username is registered
  let user = await User.findOne({ email: req.body.email.toLowerCase() });
  if (!user) return res.status(400).send("invalid email or password");

  //check if password match username password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (validPassword === false)
    return res.status(400).send("invalid email or password");

  //create token by user id and its role
  const token = jwt.sign(
    { _id: user._id, role: user.role.toLowerCase() },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );

  //set user session with session id
  req.session.user = user._id;
  req.cookies.user = user._id;
  return res.header("user-token", token).send({
    message: "logged in successfully",
    token: token,
  });
};
