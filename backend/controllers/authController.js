const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Helper to generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Helper to get absolute HTTPS profile image URL
const getFullProfileImageUrl = (url) => {
  if (!url) return "";
  // If already absolute, force HTTPS (fix for mixed content)
  if (url.startsWith("http://")) {
    return url.replace(/^http:\/\//, "https://");
  }
  if (url.startsWith("https://")) {
    return url;
  }
  // Assume relative path; build full URL
  const base = process.env.BACKEND_BASE_URL || "https://nail-it-9qwl.onrender.com";
  return `${base}${url}`;
};

// @desc   Register a new user
// @route  POST /api/auth/register
// @access Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, profileImageUrl } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save only relative URL if possible
    const sanitizedImageUrl = profileImageUrl?.startsWith("http") ? "" : profileImageUrl;

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl: sanitizedImageUrl || "", // Save relative or blank
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: getFullProfileImageUrl(user.profileImageUrl),
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Login user
// @route  POST /api/auth/login
// @access Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: getFullProfileImageUrl(user.profileImageUrl),
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Get user profile
// @route  GET /api/auth/profile
// @access Private (Requires JWT)
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Respond with absolute https image URL
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: getFullProfileImageUrl(user.profileImageUrl),
      // Don’t send token here, only on login/register
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
