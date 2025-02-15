const Ground = require("../../models/groundModel");
const fs = require("fs");

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

    const oldData = await Ground.findById(id);
    if (!oldData) {
      return res.status(404).json({
        message: "No data found with that ID",
      });
    }

    let newImage = oldData.image;

    // If a new file is uploaded, delete the old one
    if (req.file && req.file.filename) {
      const oldGroundImage = oldData.image;
      const lengthToCut = "http://localhost:3000/".length;
      const finalFilePathAfterCut = oldGroundImage.slice(lengthToCut);

      fs.unlink(finalFilePathAfterCut, (err) => {
        if (err) {
          console.log("Error deleting file:", err);
        } else {
          console.log("File deleted successfully");
        }
      });

      newImage = "http://localhost:3000/" + req.file.filename;
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
        slots,
        reviews,
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
