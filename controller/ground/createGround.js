const Ground = require("../../models/groundModel");

const createGround = async (req, res) => {
  const file = req.file;
  console.log(file);
  let filepath;
  if (!file) {
    filepath =
      "https://www.playspots.in/booking-spot/sangzika-futsal-ground-tuivamit-aizawl-mizoram/";
  } else {
    filepath = req.file.filename;
  }

  const {
    name,
    location,
    pricePerHour,
    image,
    capacity,
    size,
    operatingHours,
    slots,
    reviews,
  } = req.body;

  if (
    !name ||
    !location ||
    !pricePerHour ||
    !operatingHours ||
    !capacity ||
    !size
  ) {
    return res.status(400).json({
      message:
        "Please provide name, location, pricePerHour, and operatingHours",
    });
  }

  const ground = await Ground.create({
    name,
    location,
    pricePerHour,
    image: "http://localhost:3000/" + filepath,
    operatingHours,
    size,
    capacity,
    slots,
    reviews,
  });

  res.status(201).json({
    success: true,
    message: "Ground created successfully",
    data: ground,
  });
};

module.exports = createGround;
