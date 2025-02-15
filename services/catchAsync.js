module.exports = (fn) => {
  return (req, res, next) => {
    // Check if fn is a function
    if (typeof fn !== "function") {
      return res.status(500).json({
        message: "Invalid function passed to catchAsync",
      });
    }

    // Execute the function and catch errors
    fn(req, res, next).catch((err) => {
      console.error("Error in catchAsync:", err); // Log the error for debugging
      return res.status(500).json({
        message: err.message,
        fullError: err,
      });
    });
  };
};
