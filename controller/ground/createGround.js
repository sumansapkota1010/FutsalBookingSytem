const Ground = require("../../models/groundModel");

const createGround = async (req, res) => {
  try {
    const {
      name,
      location,
      pricePerHour,
      image,
      operatingHours,
      slots,
      reviews,
    } = req.body;
    if (!name || !location || !image || pricePerHour || !operatingHours) {
      return res.status(400).json({
        message:
          "Please provide name,location,image,pricePerHour and operatingHours ",
      });
    }

    const ground = await Ground.create({
      name,
      location,
      pricePerHour,
      image,
      operatingHours,
      slots,
      reviews,
    });

    res.status(201).json({
      success: true,
      message: "Ground created successfully",
      data: ground,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = createGround;
