import User from '../Model/UserModel.js';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

// GET all users
const getAlluser = async (req, res) => {
  try {
    const data = await User.find().select("-password");
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch users", error });
  }
};

// REGISTER a new user
const registerUser = async (req, res) => {
  const errors = validationResult(req).errors;
  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: errors[0].msg });
  }

  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already registered" });
    }

    // Hash password
    const hashPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashPassword
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error during registration", error });
  }
};

// LOGIN user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (!existingUser) {
      return res.status(400).json({ success: false, message: "No user found. Register first." });
    }

    const isMatch = bcrypt.compareSync(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '7d' }
    );

    const { _id, name } = existingUser;

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: { _id, name, email: existingUser.email }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error logging in", error });
  }
};

// UPDATE user
const updateUser = async (req, res) => {
  try {
    const id = req.query.id;
    const data = req.body;

    if (data.password) delete data.password;

    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found to update" });
    }

    res.status(200).json({ success: true, message: "User updated successfully", data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating user", error });
  }
};

// DELETE user
const deleteUser = async (req, res) => {
  try {
    const id = req.query.id;
    const deletedUser = await User.findByIdAndDelete(id).select("-password");

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "No user found to delete" });
    }

    res.status(200).json({ success: true, message: "User deleted successfully", data: deletedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting user", error });
  }
};

export { getAlluser, registerUser, loginUser, deleteUser, updateUser };
