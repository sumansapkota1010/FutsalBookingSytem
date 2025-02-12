const express = require("express");
const connectDB = require("./database/database");
const app = express();

require("dotenv").config();

connectDB(process.env.MONGO_URI);

const port = process.env.PORT | 3000;
app.listen(port, () => {
  console.log(`Server is running successfully at PORT ${port}`);
});
