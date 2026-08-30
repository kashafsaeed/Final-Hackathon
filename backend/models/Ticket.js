import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: String,
      unique: true,
      required: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

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

    category: {
      type: String,
      enum: [
        "Billing",
        "Technical",
        "Account",
        "Order",
        "Delivery",
        "Other",
      ],
      default: "Other",
    },

    orderId: {
      type: String,
      default: "",
      trim: true,
    },

    contactNumber: {
      type: String,
      default: "",
      trim: true,
    },

    contactMethod: {
      type: String,
      enum: ["Email", "Phone", "Chat"],
      default: "Email",
    },

    urgency: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

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

    aiSuggestion: {
      category: {
        type: String,
        default: "",
      },

      priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium",
      },

      summary: {
        type: String,
        default: "",
      },
    },

    aiReviewed: {
      type: Boolean,
      default: false,
    },

    resolutionNote: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model(
  "Ticket",
  ticketSchema
);

export default Ticket;