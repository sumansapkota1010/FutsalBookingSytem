const User = require("./models/userModel");
const bcrypt = require("bcrypt");

const adminSeeder = async () => {
  //admin exists garxa ki gardaina
  const isAdminexits = await User.findOne({ userEmail: "admin@gmail.com" });
  if (!isAdminexits) {
    await User.create({
      userName: "admin",
      userEmail: "admin@gmail.com",
      userPassword: bcrypt.hashSync("admin", 10),
      userPhoneNumber: 9840300084,
      role: "admin",
    });
    console.log("Admin seeded successfully");
  } else {
    console.log("Admin already seeded");
  }
};

module.exports = adminSeeder;
