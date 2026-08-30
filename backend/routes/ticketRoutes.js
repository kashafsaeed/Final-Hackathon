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
// CUSTOMER
// ======================================

router.post(
  "/",
  protect,
  customerOnly,
  createTicket
);

router.get(
  "/my",
  protect,
  customerOnly,
  getMyTickets
);

router.get(
  "/my/:id",
  protect,
  customerOnly,
  getMyTicket
);

router.patch(
  "/:id/cancel",
  protect,
  customerOnly,
  cancelTicket
);


// ======================================
// ADMIN
// ======================================

router.get(
  "/",
  protect,
  adminOnly,
  getAllTickets
);

router.get(
  "/stats",
  protect,
  adminOnly,
  getTicketStats
);

router.patch(
  "/:id",
  protect,
  adminOnly,
  updateTicket
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteTicket
);


export default router;