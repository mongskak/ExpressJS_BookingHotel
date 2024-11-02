import User from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createAccessToken,
  createRefreshToken,
} from "../middleware/auth.middleware.js";

export const Token = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(403).json({ msg: "No refresh token" });
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (!decoded) return res.status(403).json({ msg: "Invalid refresh token" });
    const user = await User.findOne({ refreshToken: refreshToken });
    if (!user) return res.status(404).json({ msg: "User no longer exists" });
    const accessToken = createAccessToken({
      userId: user._id,
      userName: user.name,
      userEmail: user.email,
    });
    res.json({ success: true, accessToken: accessToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });
    const userEmail = user.email;
    const userName = user.name;
    const userId = user.id;
    const token = createAccessToken({ userId, userName, userEmail });
    const refreshToken = createRefreshToken({ userId, userName, userEmail });
    const updatUser = await User.findByIdAndUpdate(userId, {
      $set: { refreshToken },
    });
    res.cookie("userId", user.id);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 days
    });
    res.json({
      success: true,
      accessToken: token,
      userId: user._id,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(403).json({ msg: "No refresh token" });
  const userLoged = await User.findOne({ refreshToken: refreshToken });
  if (!userLoged) return res.status(404).json({ msg: "User not found" });
  const user = await User.findByIdAndUpdate(userLoged.id, {
    $set: { refreshToken: null },
  });
  res.clearCookie("refreshToken");
  res.clearCookie("userId");
  res.status(200).json({ success: true, msg: "User logged out" });
};

export const Register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ msg: "Please fill in all fields" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });
    if (password !== confirmPassword)
      return res.status(400).json({ msg: "Passwords do not match" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};
