// get my profile

const bcrypt = require("bcrypt");

const User = require("../../../models/userModel");

exports.getMyProfile = async (req, res) => {
  const userId = req.user.id;

  const myProfile = await User.findById(userId);

  res.status(200).json({
    message: "Profile fetched successfully",
    data: myProfile,
  });
};

exports.updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { userName, userEmail, userPhoneNumber } = req.body;
  if (!userName || !userEmail || !userPhoneNumber) {
    return res.status(400).json({
      message: "Please provide username , user email and user phonenumber",
    });
  }
  const updatedProfile = await User.findByIdAndUpdate(
    userId,
    {
      userName,
      userEmail,
      userPhoneNumber,
    },
    {
      runValidators: true,
      new: true,
    }
  );
  res.status(200).json({
    message: "profile updated successfully",
    data: updatedProfile,
  });
};

exports.deleteProfile = async (req, res) => {
  const userId = req.user.id;

  await User.findByIdAndDelete(userId);
  res.status(400).json({
    message: "Profile deleted successfully",
    data: null,
  });
};

exports.updateMyPassword = async (req, res) => {
  const userId = req.user.id;
  const { oldPassword, newPassword, confirmPassword } = req.body;
  if (!oldPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({
      message: "Please provide oldPassword , newPassword and confirmPassword",
    });
  }
  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      message: "new password and confirm password didnot match",
    });
  }
  // old password extract garne
  const userData = await User.findById(userId);
  const hashedPassword = userData.userPassword;

  //old password correct xa ki xaina herney
  const isOldPasswordCorrect = await bcrypt.compare(
    oldPassword,
    hashedPassword
  );
  if (!isOldPasswordCorrect) {
    return res.status(400).json({
      message: "Password didnot matched",
    });
  }
  //matched vayo bhaney
  userData.userPassword = bcrypt.hashSync(newPassword, 12);
  await userData.save();
  res.status(200).json({
    message: "Password changed successfully",
  });
};
