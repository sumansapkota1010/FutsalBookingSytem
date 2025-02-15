const Ground = require("../../models/groundModel");

const singleGround = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!id) {
    res.status(400).json({
      message: "Please provide id",
    });
  }
  const ground = await Ground.findById(id)
    .populate("slots")
    .populate("reviews");
  if (!ground) {
    return res.status(400).json({
      message: "Ground not found",
    });
  }
  res.status(200).json({
    data: ground,
  });
};

module.exports = singleGround;
