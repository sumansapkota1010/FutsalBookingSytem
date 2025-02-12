const express = require("express");
const connectDB = require("./database/database");
const User = require("./models/userModel");
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB(process.env.MONGO_URI);

//routes
app.get("/api/", (req, res) => {
  res.status(200).json({
    message: "This is working",
  });
});

app.post("/api/register", async (req, res) => {
  const { name, email, password, phone, role } = req.body;
  console.log(req.body);

  if (!name || !email || !password || !phone || !role) {
    return res.status(400).json({
      message: "Please provide name,emai,password,phone and role",
    });
  }



  

  await User.create({
    userName: name,
    userEmail: email,
    userPassword: password,
    userPhoneNumber: phone,
    role: role,
  });
  res.status(200).json({
    message: "User registered successfully",
    User,
  });
});

const port = process.env.PORT | 3000;
app.listen(port, () => {
  console.log(`Server is running successfully at PORT ${port}`);
});
