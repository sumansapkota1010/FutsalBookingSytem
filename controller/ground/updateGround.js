const Ground = require("../../models/groundModel");

const updateGround = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      location,
      pricePerHour,
      image,
      operatingHours,
      slots,
      reviews,
    } = req.body;

    // Check if at least one field is provided for update
    if (
      !name &&
      !location &&
      !pricePerHour &&
      !image &&
      !operatingHours &&
      !slots &&
      !reviews
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one field to update",
      });
    }

    // Update the ground
    const updatedGround = await Ground.findByIdAndUpdate(
      id,
      { name, location, pricePerHour, image, operatingHours, slots, reviews },
      { new: true, runValidators: true }
    );

    // Check if the ground exists
    if (!updatedGround) {
      return res.status(404).json({
        success: false,
        message: "Ground not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Ground updated successfully",
      data: updatedGround,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = updateGround;
