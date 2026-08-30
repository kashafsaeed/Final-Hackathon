import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


// ===============================
// Generate JWT
// ===============================

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id.toString(),
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};


// ===============================
// REGISTER CUSTOMER
// ===============================

export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters",
      });
    }

    const normalizedEmail =
      email.toLowerCase().trim();

    // Check existing user
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message:
          "An account with this email already exists",
      });
    }

    // Hash password
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // IMPORTANT:
    // Public registration always creates CUSTOMER
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: "customer",
    });

    res.status(201).json({
      success: true,
      message:
        "Account created successfully. Please login.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(
      "Register Error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};


// ===============================
// LOGIN
// ===============================

export const login = async (req, res) => {
  try {
    const {
      email,
      password,
      role,
    } = req.body;

    // Validation
    if (!email || !password || !role) {
      return res.status(400).json({
        message:
          "Email, password and role are required",
      });
    }

    // Validate role
    if (
      !["customer", "admin"].includes(role)
    ) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    const normalizedEmail =
      email.toLowerCase().trim();

    // Find user
    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        message:
          "Invalid email or password",
      });
    }

    // IMPORTANT ROLE CHECK
    if (user.role !== role) {
      return res.status(403).json({
        message:
          `This account is registered as ${user.role}. Please select the correct role.`,
      });
    }

    // Password check
    const isPasswordCorrect =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message:
          "Invalid email or password",
      });
    }

    // Generate JWT
    const token =
      generateToken(user);

    res.status(200).json({
      success: true,
      message: "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(
      "Login Error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};