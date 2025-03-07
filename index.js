const express = require("express");
const connectDB = require("./database/database");
const cors = require("cors");
const app = express();

require("dotenv").config();
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173", // Local development
        "https://futsal-booking-system-frontend.vercel.app", // Production
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error("Not allowed by CORS")); // Block the request
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("uploads"));

const authRoute = require("./routes/auth/authRoutes");
const groundRoute = require("./routes/groundRoute/groundRoute");
const slotRoute = require("./routes/slotRoute/slotRoute");
const bookingRoute = require("./routes/bookingRoute/bookingRoute");
const paymentRoute = require("./routes/paymentRoute/paymentRoute");
const reviewRoute = require("./routes/reviewRoute/reviewRoute");
const profileRoute = require("./routes/profile/profileRoute");
const userRoute = require("./routes/admin/adminUserRoute");
const contactRoute = require("./routes/contactRoute/contactRoute");
//database connection
connectDB(process.env.MONGO_URI);

//routes
app.use("/api", authRoute);
app.use("/api", groundRoute);
app.use("/api", slotRoute);
app.use("/api", paymentRoute);
app.use("/api", bookingRoute);
app.use("/api", reviewRoute);
app.use("/api", profileRoute);
app.use("/api", userRoute);
app.use("/api", contactRoute);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "This is working",
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running successfully at PORT ${port}`);
});
