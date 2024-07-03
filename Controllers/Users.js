const bcrypt = require("bcrypt");
const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();  

const register = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({
        success: false,
        emailExists: true,
        message: "Email already exists!",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({ name, email, mobile, password: hashedPassword });

    // Save the user to the database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY);

    // Respond with success and token
    res.status(200).json({
      success: true,
      token,
      user: {
        email: newUser.email,
        name: newUser.name,
        userId: newUser._id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    // Check if user exists in database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid user or password" });
    }

    // Compare hashed password
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      return res.status(400).json({ error: "Invalid user or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);

    // Respond with success and token
    res.json({
      success: true,
      token,
      user: {
        email: user.email,
        name: user.name,
        userId: user._id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

module.exports = {
  login,
  register,
};
