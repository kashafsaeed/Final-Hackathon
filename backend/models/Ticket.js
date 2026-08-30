
import mongoose from "mongoose";


// ======================================
// TICKET SCHEMA
// ======================================

const ticketSchema = new mongoose.Schema(
  {

    // ================================
    // Unique Ticket Number
    // ================================

    ticketNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },


    // ================================
    // Customer
    // ================================

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },


    // ================================
    // Ticket Information
    // ================================

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },


    // ================================
    // Category
    // ================================

    category: {
      type: String,
      enum: [
        "Billing",
        "Technical",
        "Account",
        "Order",
        "General",
      ],
      default: "General",
    },


    // ================================
    // Priority
    // ================================

    priority: {
      type: String,
      enum: [
        "Low",
        "Medium",
        "High",
      ],
      default: "Medium",
    },


    // ================================
    // Urgency
    // ================================

    urgency: {
      type: String,
      enum: [
        "Low",
        "Medium",
        "High",
      ],
      default: "Medium",
    },


    // ================================
    // Order Information
    // ================================

    orderId: {
      type: String,
      trim: true,
      default: "",
    },


    // ================================
    // Contact Information
    // ================================

    contactNumber: {
      type: String,
      trim: true,
      default: "",
    },


    contactMethod: {
      type: String,
      enum: [
        "Email",
        "Phone",
        "SMS",
      ],
      default: "Email",
    },


    // ================================
    // Ticket Status
    // ================================

    status: {
      type: String,
      enum: [
        "New",
        "Assigned",
        "In Progress",
        "Resolved",
        "Cancelled",
      ],
      default: "New",
    },


    // ================================
    // Assigned Agent
    // ================================

    assignedAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },


    // ================================
    // AI Suggestion
    // ================================

    aiSuggestion: {

      category: {
        type: String,
        default: "",
      },

      priority: {
        type: String,
        enum: [
          "Low",
          "Medium",
          "High",
          "",
        ],
        default: "",
      },

      summary: {
        type: String,
        default: "",
      },

    },


    // ================================
    // AI Human Review
    // ================================

    aiReviewed: {
      type: Boolean,
      default: false,
    },


    // ================================
    // Resolution
    // ================================

    resolutionNote: {
      type: String,
      trim: true,
      default: "",
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
// EXPORT
// ======================================

const Ticket = mongoose.model(
  "Ticket",
  ticketSchema
);

export default Ticket;

