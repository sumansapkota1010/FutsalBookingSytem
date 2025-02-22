const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../services/sendEmail");

exports.registerUser = async (req, res) => {
  const { name, phoneNumber, email, password } = req.body;

  if (!name || !email || !password || !phoneNumber) {
    return res.status(400).json({
      message: "Please provide name,email,password,phone number",
    });
  }
  const phoneRegex = /^(98|97)\d{8}$/;
  if (!phoneRegex.test(phoneNumber)) {
    return res.status(400).json({
      message: "Invalid phone number format",
    });
  }
  // check if that email user already exist or not
  const userFound = await User.find({ userEmail: email });
  console.log(userFound);
  if (userFound.length > 0) {
    return res.status(400).json({
      message: "User with that email already registered",
    });
  }
  const userData = await User.create({
    userName: name,
    userEmail: email,
    userPassword: bcrypt.hashSync(password, 10),
    userPhoneNumber: phoneNumber,
  });
  res.status(200).json({
    message: "User registered successfully",
    data: userData,
  });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide email and password",
    });
  }

  const userFound = await User.find({ userEmail: email });

  if (userFound.length == 0) {
    return res.status(400).json({
      message: "User with that email is  not registered",
    });
  }

  const isMatched = bcrypt.compareSync(password, userFound[0].userPassword);
  if (isMatched) {
    const token = jwt.sign({ id: userFound[0]._id }, process.env.SECRET_KEY, {
      expiresIn: "50d",
    });
    res.status(200).json({
      message: "User logged in successfully",
      token: token,
    });
  } else {
    res.status(400).json({
      message: "Invalid Password",
    });
  }
};

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      message: "Please provide email",
    });
  }

  //check if that email is registered or not
  const userExist = await User.find({ userEmail: email });
  if (userExist.length === 0) {
    return res.status(400).json({
      message: "Email is not registered",
    });
  }

  const otp = Math.floor(1000 + Math.random() * 9000);
  userExist[0].otp = otp;
  await userExist[0].save();

  await sendEmail({
    email: email,
    subject: "Your otp! ",
    message: `Your otp is ${otp}`,
  });
  res.status(200).json({
    message: "Email sent successfully",
  });
};

//verify otp
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({
      message: "Please provide email and otp",
    });
  }

  // check if that otp is correct or not of that email
  const userExists = await User.find({ userEmail: email });
  if (userExists.length == 0) {
    return res.status(400).json({
      message: "Email is not registered",
    });
  }
  if (userExists[0].otp !== otp) {
    res.status(400).json({
      message: "Invalid otp",
    });
  } else {
    //dispost the otp so that it cannot be used next time the same otp
    userExists[0].otp = undefined;
    await userExists[0].save();
    res.status(200).json({
      message: "Otp is correct",
    });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;
  if (!email || !newPassword || !confirmPassword) {
    return res.status(400).json({
      message: "Please provide email,newpassword and confirm password",
    });
  }
  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      message: "New password and confirm password doesnot match",
    });
  }
  const userExists = await User.find({ userEmail: email });
  if (userExists.length == 0) {
    return res.status({
      message: "Email is not registered",
    });
  }
  userExists[0].userPassword = bcrypt.hashSync(newPassword, 10);
  await userExists[0].save();
  res.status(200).json({
    message: "Password changed successfully",
  });
};
