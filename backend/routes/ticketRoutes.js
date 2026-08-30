
import express from "express";

import {
  createTicket,
  getMyTickets,
  getMyTicket,
  cancelTicket,
  getAllTickets,
  updateTicket,
  deleteTicket,
  getTicketStats,
} from "../controllers/ticketController.js";

import {
  protect,
  adminOnly,
  customerOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();


// ======================================
// CUSTOMER ROUTES
// ======================================

// Create ticket
router.post(
  "/",
  protect,
  customerOnly,
  createTicket
);


// Get customer's tickets
router.get(
  "/my",
  protect,
  customerOnly,
  getMyTickets
);


// Get single customer's ticket
router.get(
  "/my/:id",
  protect,
  customerOnly,
  getMyTicket
);


// Cancel customer's ticket
router.patch(
  "/:id/cancel",
  protect,
  customerOnly,
  cancelTicket
);


// ======================================
// ADMIN ROUTES
// ======================================

// Get all tickets
router.get(
  "/all",
  protect,
  adminOnly,
  getAllTickets
);


// Get ticket statistics
router.get(
  "/stats",
  protect,
  adminOnly,
  getTicketStats
);


// Update ticket
router.patch(
  "/:id",
  protect,
  adminOnly,
  updateTicket
);


// Delete ticket
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteTicket
);


export default router;
