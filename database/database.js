const mongoose = require("mongoose");

const adminSeeder = require("../adminSeeder");

const connectDB = async (URI) => {
  await mongoose.connect(URI);
  console.log("Database connection successfull");
  //admin seeding
  adminSeeder();
};

module.exports = connectDB;
