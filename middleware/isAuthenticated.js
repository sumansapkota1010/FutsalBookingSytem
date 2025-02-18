const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/userModel");

const isAuthenicated = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized: No token provided",
    });
  }

  const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);

  const user = await User.findById(decoded.id);
  if (!user) {
    return res.status(404).json({
      message: "User does not exist with that token/id",
    });
  }

  req.user = user;

  next();
};

module.exports = isAuthenicated;
