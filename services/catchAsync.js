module.exports = (fn) => {
  return (req, res, next) => {
    if (typeof fn !== "function") {
      return res.status(500).json({
        message: "Invalid function passed to catchAsync",
      });
    }

    fn(req, res, next).catch((err) => {
      // Log the error for debugging purposes
      console.error("Error in catchAsync:", err);

      // Determine the status code based on the error type
      const statusCode = err.statusCode || 500;

      // Send a response to the client
      res.status(statusCode).json({
        message: err.message || "Something went wrong",
      });
    });
  };
};
