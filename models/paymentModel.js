const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  amount: { type: Number, required: true },

  status: {
    type: String,
    enum: ["success", "failed", "completed"],
    default: "pending",
  },
  method: { type: String, enum: ["COD", "khalti"] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", paymentSchema);
const mongoose = require("mongoose");
