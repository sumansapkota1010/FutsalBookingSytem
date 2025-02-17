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

  const slotExists = await Slot.findById(slot);
  if (!slotExists) {
    return res.status(404).json({
      message: "Slot not found",
    });
  }

  if (slotExists.isBooked) {
    return res.status(400).json({
      message: "Slot is already booked",
    });
  }

  // Create the booking
  const booking = await Booking.create({
    user: userId,
    ground,
    slot,
    status: "pending",
  });

  res.status(201).json({
    message: "Booking created successfully",
    data: booking,
  });
};

module.exports = createBooking;
