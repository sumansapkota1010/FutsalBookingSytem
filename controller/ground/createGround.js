const mongoose = require("mongoose");
const Ground = require("../../models/groundModel");

const createGround = async (req, res) => {
  const file = req.file;
  console.log(file);
  let filepath;

  // Handle file path
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

  // Ensure all required fields are provided
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
        "Please provide name, location, pricePerHour, operatingHours, capacity, and size",
    });
  }

  // Convert slots and reviews to ObjectId if they are provided
  let slotObjectIds = [];
  let reviewObjectIds = [];

  if (slots && Array.isArray(slots)) {
    slotObjectIds = slots.map((slot) => mongoose.Types.ObjectId(slot));
  }

  if (reviews && Array.isArray(reviews)) {
    reviewObjectIds = reviews.map((review) => mongoose.Types.ObjectId(review));
  }

  try {
    // Create a new ground document
    const ground = await Ground.create({
      name,
      location,
      pricePerHour,
      image: "http://localhost:3000/" + filepath, // Assuming image URL structure is correct
      operatingHours,
      size,
      capacity,
      slots: slotObjectIds,
      reviews: reviewObjectIds,
    });

    // Return a success response
    res.status(201).json({
      success: true,
      message: "Ground created successfully",
      data: ground,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error creating ground",
      error: error.message,
    });
  }
};

module.exports = createGround;
