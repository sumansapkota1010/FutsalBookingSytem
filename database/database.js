const mongoose = require("mongoose");
const User = require("../models/userModel");

const connectDB = async (URI) => {
  await mongoose.connect(URI);
  console.log("Database connection successfull");
  //admin seeding

  //admin exists garxa ki gardaina
  const isAdminexits = await User.findOne({ userEmail: "admin@gmail.com" });
  if (!isAdminexits) {
    await User.create({
      userName: "admin",
      userEmail: "admin@gmail.com",
      userPassword: "admin@12345",
      userPhoneNumber: 9840300084,
      role: "admin",
    });
    console.log("Admin seeded successfully");
  } else {
    console.log("Admin already seeded");
  }
};

module.exports = connectDB;
