const User = require("../models/User");

// get user details by id
exports.getMe = async (req, res) => {
  try {
      const user = await User.findById(req.auth.userId);
      return res.json(user);
  } catch (err) {
    return res.status(400).json({
      error: err
    });
  }
}
