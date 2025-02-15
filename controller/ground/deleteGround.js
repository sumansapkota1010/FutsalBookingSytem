const Ground = require("../../models/groundModel");

const deleteGround = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "Please provide id",
    });
  }
  const ground = await Ground.findByIdAndDelete(id);
  if (!ground) {
    return res.status(400).json({
      message: "No ground found",
    });
  }
  res.status(200).json({
    message: "Ground deleted successfully",
  });
};

module.exports = deleteGround;
