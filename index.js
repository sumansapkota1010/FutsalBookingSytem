const express = require("express");
const connectDB = require("./database/database");
const User = require("./models/userModel");
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoute = require("./routes/auth/authRoutes");

//database connection
connectDB(process.env.MONGO_URI);

//routes
app.use("/api", authRoute);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "This is working",
  });
});

const port = process.env.PORT | 3000;
app.listen(port, () => {
  console.log(`Server is running successfully at PORT ${port}`);
});
