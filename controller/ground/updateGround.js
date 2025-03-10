const Ground = require("../../models/groundModel");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

const updateGround = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, pricePerHour, operatingHours, slots, reviews } =
      req.body;

    if (!name || !location || !pricePerHour || !operatingHours || !id) {
      return res.status(400).json({
        message:
          "Please provide name, location, pricePerHour, and operatingHours, id",
      });
    }

    let slotObjectIds = [];
    let reviewObjectIds = [];

    if (slots && Array.isArray(slots)) {
      slotObjectIds = slots.map((slot) => mongoose.Types.ObjectId(slot));
    }

    if (reviews && Array.isArray(reviews)) {
      reviewObjectIds = reviews.map((review) =>
        mongoose.Types.ObjectId(review)
      );
    }

    const oldData = await Ground.findById(id);
    if (!oldData) {
      return res.status(404).json({
        message: "No data found with that ID",
      });
    }

    let newImageUrl;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "ground_images",
      });
      newImageUrl = result.secure_url;

      if (oldData.groundImage) {
        const publicId = oldData.groundImage.split("/".pop().split(".")[0]);
        await cloudinary.uploader.destroy(`ground_images/${publicId}`);
      }
      fs.unlinkSync(req.file.path);
    }

    // Update the ground entry
    const updatedGround = await Ground.findByIdAndUpdate(
      id,
      {
        name,
        location,
        pricePerHour,
        image: newImage,
        operatingHours,
        slots: slotObjectIds,
        reviews: reviewObjectIds,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Ground updated successfully",
      data: updatedGround,
    });
  } catch (error) {
    console.error("Error updating ground:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = updateGround;
