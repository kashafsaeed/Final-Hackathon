
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";


// ===============================
// ENV CONFIG
// ===============================

dotenv.config();


// ===============================
// APP
// ===============================

const app = express();


// ===============================
// DATABASE
// ===============================

connectDB();


// ===============================
// MIDDLEWARE
// ===============================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());


// ===============================
// TEST ROUTE
// ===============================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ResolveHub API is running",
  });
});


// ===============================
// AUTH ROUTES
// ===============================

app.use(
  "/api/auth",
  authRoutes
);


// ===============================
// TICKET ROUTES
// ===============================

app.use(
  "/api/tickets",
  ticketRoutes
);


// ===============================
// 404
// ===============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});


// ===============================
// SERVER
// ===============================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );
});

