
import mongoose from "mongoose";


// ======================================
// USER SCHEMA
// ======================================

const userSchema = new mongoose.Schema(
  {

    // ================================
    // Name
    // ================================

    name: {
      type: String,
      required: true,
      trim: true,
    },


    // ================================
    // Email
    // ================================

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },


    // ================================
    // Password
    // ================================

    password: {
      type: String,
      required: true,
      minlength: 6,
    },


    // ================================
    // Role
    // ================================

    role: {
      type: String,

      enum: [
        "customer",
        "admin",
      ],

      default: "customer",
    },

  },


  // ================================
  // Timestamps
  // ================================

  {
    timestamps: true,
  }
);


// ======================================
// CREATE USER MODEL
// ======================================

const User = mongoose.model(
  "User",
  userSchema
);


// ======================================
// EXPORT
// ======================================

export default User;
