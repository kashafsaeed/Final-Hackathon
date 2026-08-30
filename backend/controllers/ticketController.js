import Ticket from "../models/Ticket.js";
import { analyzeTicket } from "../services/aiService.js";


// ======================================
// Generate Ticket Number
// ======================================

const generateTicketNumber = () => {
  const random =
    Math.floor(
      100000 + Math.random() * 900000
    );

  return `RH-${random}`;
};


// ======================================
// CUSTOMER CREATE TICKET
// ======================================

export const createTicket = async (
  req,
  res
) => {
  try {
    const {
      title,
      description,
      category,
      orderId,
      contactNumber,
      contactMethod,
      urgency,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message:
          "Title and description are required",
      });
    }

    // AI analysis
    const ai = await analyzeTicket({
      title,
      description,
      category,
    });

    const ticket =
      await Ticket.create({
        ticketNumber:
          generateTicketNumber(),

        customer: req.user.id,

        title,

        description,

        category:
          category || ai.category,

        orderId,

        contactNumber,

        contactMethod,

        urgency,

        priority: ai.priority,

        aiSuggestion: {
          category: ai.category,
          priority: ai.priority,
          summary: ai.summary,
        },

        aiReviewed: false,

        status: "New",
      });

    const populatedTicket =
      await Ticket.findById(
        ticket._id
      ).populate(
        "customer",
        "name email"
      );

    res.status(201).json({
      success: true,
      message:
        "Ticket created successfully",
      ticket: populatedTicket,
    });

  } catch (error) {
    console.error(
      "Create ticket error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};


// ======================================
// CUSTOMER GET OWN TICKETS
// ======================================

export const getMyTickets = async (
  req,
  res
) => {
  try {
    const tickets =
      await Ticket.find({
        customer: req.user.id,
      }).sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      tickets,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};


// ======================================
// GET SINGLE CUSTOMER TICKET
// ======================================

export const getMyTicket = async (
  req,
  res
) => {
  try {
    const ticket =
      await Ticket.findOne({
        _id: req.params.id,
        customer: req.user.id,
      }).populate(
        "customer",
        "name email"
      );

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    res.json({
      success: true,
      ticket,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};


// ======================================
// CUSTOMER CANCEL TICKET
// ======================================

export const cancelTicket = async (
  req,
  res
) => {
  try {
    const ticket =
      await Ticket.findOne({
        _id: req.params.id,
        customer: req.user.id,
      });

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    if (
      ticket.status === "Resolved"
    ) {
      return res.status(400).json({
        message:
          "Resolved ticket cannot be cancelled",
      });
    }

    if (
      ticket.status === "Cancelled"
    ) {
      return res.status(400).json({
        message:
          "Ticket is already cancelled",
      });
    }

    ticket.status = "Cancelled";

    await ticket.save();

    res.json({
      success: true,
      message:
        "Ticket cancelled successfully",
      ticket,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};


// ======================================
// ADMIN GET ALL TICKETS
// ======================================

export const getAllTickets = async (
  req,
  res
) => {
  try {
    const tickets =
      await Ticket.find()
        .populate(
          "customer",
          "name email"
        )
        .sort({
          createdAt: -1,
        });

    res.json({
      success: true,
      tickets,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};


// ======================================
// ADMIN UPDATE TICKET
// ======================================

export const updateTicket = async (
  req,
  res
) => {
  try {
    const {
      status,
      priority,
      category,
      aiReviewed,
      resolutionNote,
    } = req.body;

    const ticket =
      await Ticket.findById(
        req.params.id
      );

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    if (
      ticket.status === "Resolved" &&
      status &&
      status !== "Resolved"
    ) {
      return res.status(400).json({
        message:
          "Resolved ticket must be reopened first",
      });
    }

    if (
      status === "Resolved" &&
      !resolutionNote &&
      !ticket.resolutionNote
    ) {
      return res.status(400).json({
        message:
          "Resolution note is required before resolving",
      });
    }

    if (status)
      ticket.status = status;

    if (priority)
      ticket.priority = priority;

    if (category)
      ticket.category = category;

    if (
      aiReviewed !== undefined
    ) {
      ticket.aiReviewed =
        aiReviewed;
    }

    if (resolutionNote !== undefined) {
      ticket.resolutionNote =
        resolutionNote;
    }

    await ticket.save();

    const updatedTicket =
      await Ticket.findById(
        ticket._id
      ).populate(
        "customer",
        "name email"
      );

    res.json({
      success: true,
      message:
        "Ticket updated successfully",
      ticket: updatedTicket,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// ======================================
// ADMIN DELETE TICKET
// ======================================

export const deleteTicket = async (
  req,
  res
) => {
  try {
    const ticket =
      await Ticket.findByIdAndDelete(
        req.params.id
      );

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    res.json({
      success: true,
      message:
        "Ticket deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};


// ======================================
// ADMIN STATS
// ======================================

export const getTicketStats = async (
  req,
  res
) => {
  try {
    const total =
      await Ticket.countDocuments();

    const newTickets =
      await Ticket.countDocuments({
        status: "New",
      });

    const inProgress =
      await Ticket.countDocuments({
        status: "In Progress",
      });

    const resolved =
      await Ticket.countDocuments({
        status: "Resolved",
      });

    const cancelled =
      await Ticket.countDocuments({
        status: "Cancelled",
      });

    const high =
      await Ticket.countDocuments({
        priority: "High",
      });

    const medium =
      await Ticket.countDocuments({
        priority: "Medium",
      });

    const low =
      await Ticket.countDocuments({
        priority: "Low",
      });

    res.json({
      success: true,
      stats: {
        total,
        newTickets,
        inProgress,
        resolved,
        cancelled,
        high,
        medium,
        low,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};