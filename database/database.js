const mongoose = require("mongoose");

const connectDB = async (URI) => {
  await mongoose.connect(URI);
  console.log("Database connection successfull");
};

module.exports = connectDB;
