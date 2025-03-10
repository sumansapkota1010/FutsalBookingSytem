const mongoose = require("mongoose");
const Ground = require("../../models/groundModel");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

const createGround = async (req, res) => {
  const file = req.file;
  console.log(file);
  let filepath;

  // Handle file path
  if (!file) {
    filepath =
      "https://www.playspots.in/booking-spot/sangzika-futsal-ground-tuivamit-aizawl-mizoram/";
  } else {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "ground_images",
    });
    filepath = result.secure_url;
  }

  const {
    name,
    location,
    pricePerHour,

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
      image: filepath,
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
