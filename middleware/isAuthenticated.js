const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/userModel");

const isAuthenicated = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(400).json({
      message: "Please provide token",
    });
  }
  //verify if the token is legit or not
  const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);
  if (!decoded) {
    return res.status(403).json({
      message: "Don't try to  this",
    });
  }
  // check if decoded.od(userID) exists in the user table
  const doesUserExist = await User.findOne({ _id: decoded.id });
  if (!doesUserExist) {
    return res.status(404).json({
      message: "User doesnot exists with that token/id",
    });
  }
  req.user = doesUserExist;
  next();
};

module.exports = isAuthenicated;
