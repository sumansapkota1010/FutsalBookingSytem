const axios = require("axios");

const Slot = require("../../models/slotModel");

const bookingModel = require("../../models/bookingModel");

// Initiate Khalti Payment
const initiateKhaltiPayment = async (req, res) => {
  const { bookingId } = req.body;
  const userId = req.user._id;

  // Validate input
  if (!bookingId) {
    return res.status(400).json({ message: "Please provide bookingId" });
  }

  // Find the booking
  const booking = await bookingModel.findById(bookingId).populate("slot");
  console.log(booking);
  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  // Get the slot price
  const slot = await Slot.findById(booking.slot);
  if (!slot) {
    return res.status(404).json({ message: "Slot not found" });
  }

  const amount = slot.price;

  const data = {
    return_url: "http://localhost:3000/success",
    purchase_order_id: bookingId,
    amount: amount * 100,
    website_url: "http://localhost:3000/",
    purchase_order_name: "FutsalBooking_" + bookingId,
  };

  // Initiate Khalti payment
  const response = await axios.post(
    "https://a.khalti.com/api/v2/epayment/initiate/",
    data,
    {
      headers: {
        Authorization: process.env.KHALTI_SECRET_KEY,
      },
    }
  );
  console.log(response.data);
  return;

  // Create a payment record
  const payment = await Payment.create({
    user: userId,
    booking: bookingId,
    amount: amount,
    status: "pending", // Default status
    method: "khalti",
  });

  // Save the pidx to the payment record
  payment.pidx = response.data.pidx;
  await payment.save();

  // Return the payment URL to the frontend
  res.status(200).json({
    message: "Payment initiated successfully",
    paymentUrl: response.data.payment_url,
  });
};

// Verify Khalti Payment
const verifyKhaltiPayment = async (req, res) => {
  const { pidx } = req.body;
  const userId = req.user._id; // Assuming user ID is available from authentication middleware

  // Verify the payment with Khalti
  const response = await axios.post(
    "https://a.khalti.com/api/v2/epayment/lookup/",
    { pidx },
    {
      headers: {
        Authorization: "key your_khalti_secret_key", // Replace with your Khalti secret key
      },
    }
  );

  if (response.data.status === "Completed") {
    // Find the payment record
    const payment = await Paymen.findOne({ pidx });
    if (!payment) {
      return res.status(404).json({ message: "Payment record not found" });
    }

    // Update the payment status
    payment.status = "completed";
    await payment.save();

    // Update the booking payment status
    const booking = await Booking.findById(payment.booking);
    if (booking) {
      booking.payment = payment._id; // Link the payment to the booking
      booking.status = "confirmed"; // Update booking status to confirmed
      await booking.save();
    }

    res.status(200).json({ message: "Payment verified successfully" });
  } else {
    // Update the payment status to failed
    const payment = await Payment.findOne({ pidx });
    if (payment) {
      payment.status = "failed";
      await payment.save();
    }

    res.status(400).json({ message: "Payment verification failed" });
  }
};

// Create COD Payment
const createCODPayment = async (req, res) => {
  const { bookingId } = req.body;
  const userId = req.user._id; // Assuming user ID is available from authentication middleware

  // Validate input
  if (!bookingId) {
    return res.status(400).json({ message: "Please provide bookingId" });
  }

  // Find the booking
  const booking = await Booking.findById(bookingId).populate("slot");
  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  // Get the slot price
  const slot = await Slot.findById(booking.slot);
  if (!slot) {
    return res.status(404).json({ message: "Slot not found" });
  }

  const amount = slot.price; // Use the slot's price as the payment amount

  // Create a COD payment record
  const payment = await Payment.create({
    user: userId,
    booking: bookingId,
    amount: amount,
    status: "pending", // Default status
    method: "COD",
  });

  // Update the booking payment status
  booking.payment = payment._id; // Link the payment to the booking
  booking.status = "confirmed"; // Update booking status to confirmed
  await booking.save();

  res
    .status(201)
    .json({ message: "COD payment created successfully", payment });
};

module.exports = {
  initiateKhaltiPayment,
  verifyKhaltiPayment,
  createCODPayment,
};
