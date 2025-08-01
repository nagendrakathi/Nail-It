const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Returns an absolute HTTPS URL for profile images

const getFullProfileImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http://")) {
    return url.replace(/^http:\/\//, "https://");
  }
  if (url.startsWith("https://")) {
    return url;
  }
  const base = process.env.BACKEND_BASE_URL || "https://nail-it-9qwl.onrender.com";
  return `${base}${url}`;
};

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, profileImageUrl } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save only relative if local file path, otherwise clear
    let savedImageUrl = profileImageUrl;
    if (savedImageUrl && savedImageUrl.startsWith("http")) {
      savedImageUrl = ""; // drop external images, store only local paths in DB
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl: savedImageUrl || "",
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

// Login
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

// Get profile (JWT protected)
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: getFullProfileImageUrl(user.profileImageUrl),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
