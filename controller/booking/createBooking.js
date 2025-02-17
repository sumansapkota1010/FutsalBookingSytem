const Slot = require("../../models/slotModel");
const Booking = require("../../models/bookingModel");

const createBooking = async (req, res) => {
  const { ground, slot } = req.body;
  const userId = req.user._id;
  if (!ground || !slot) {
    return res.status(400).json({
      message: "Please provide ground and slot",
    });
  }
  //check if the slot is available or not
  const slotExists = await Slot.findById(slot);
  if (!slotExists) {
    return res.status(400).json({
      message: "Slot not found",
    });
  }
  if (slotExists.isBooked) {
    return res.status(400).json({
      message: "Slot is already booked",
    });
  }
  //create the booking
  const booking = await Booking.create({
    user: userId,
    ground,
    slot,
    status: "pending",
  });

  slotExists.isBooked = true;
  await slotExists.save();
  res.status(200).json({
    message: "Booking created successfully",
    data: booking,
  });
};

module.exports = createBooking;
