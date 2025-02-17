const express = require("express");
const connectDB = require("./database/database");
const User = require("./models/userModel");
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("uploads"));

const authRoute = require("./routes/auth/authRoutes");
const groundRoute = require("./routes/groundRoute/groundRoute");
const slotRoute = require("./routes/slotRoute/slotRoute");
const bookingRoute = require("./routes/bookingRoute/bookingRoute");
const paymentRoute = require("./routes/paymentRoute/paymentRoute");

//database connection
connectDB(process.env.MONGO_URI);

//routes
app.use("/api", authRoute);
app.use("/api", groundRoute);
app.use("/api", slotRoute);
app.use("/api", paymentRoute);
app.use("/api", bookingRoute);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "This is working",
  });
});

const port = process.env.PORT | 3000;
app.listen(port, () => {
  console.log(`Server is running successfully at PORT ${port}`);
});
