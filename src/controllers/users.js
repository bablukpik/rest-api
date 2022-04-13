const User = require("../models/User");

// single user
exports.getMe = async (req, res) => {
  try {
      const user = await User.findById(req.auth.userId);
      res.json(user);
  } catch (err) {
    res.status(400).json({
      error: err
    });
  }
}
