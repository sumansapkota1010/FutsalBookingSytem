const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  ground: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ground",
    required: true,
  },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  date: { type: Date, required: true },
  isBooked: { type: Boolean, default: false },
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Slot", slotSchema);
