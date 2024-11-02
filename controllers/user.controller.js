import User from "../models/users.model.js";

export const getProfile = async (req, res) => {
  const id = req.cookies.userId;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    const userProfile = {
      name: user.name,
      email: user.email,
      id: user._id,
    };
    res.json({ success: true, user: userProfile });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const getUserProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    const userProfile = {
      name: user.name,
      email: user.email,
      id: user._id,
    };
    res.json({ success: true, user: userProfile });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};
