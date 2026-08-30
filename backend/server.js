
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";

// import connectDB from "./config/db.js";

// import authRoutes from "./routes/authRoutes.js";
// import ticketRoutes from "./routes/ticketRoutes.js";


// // ======================================
// // ENV
// // ======================================

// dotenv.config();


// // ======================================
// // APP
// // ======================================

// const app = express();


// // ======================================
// // DATABASE
// // ======================================

// connectDB();


// // ======================================
// // MIDDLEWARE
// // ======================================

// app.use(
//   cors({
//     origin: "https://frontend-six-theta-mfk5dixgph.vercel.app",
//     credentials: true,
//   })
// );

// app.use(express.json());


// // ======================================
// // ROOT
// // ======================================

// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "ResolveHub API is running",
//   });
// });


// // ======================================
// // AUTH ROUTES
// // ======================================

// app.use(
//   "/api/auth",
//   authRoutes
// );


// // ======================================
// // TICKET ROUTES
// // ======================================

// app.use(
//   "/api/tickets",
//   ticketRoutes
// );


// // ======================================
// // 404 HANDLER
// // ======================================

// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: `Route not found: ${req.method} ${req.originalUrl}`,
//   });
// });


// // ======================================
// // ERROR HANDLER
// // ======================================

// app.use(
//   (err, req, res, next) => {

//     console.error(
//       "Server Error:",
//       err
//     );

//     res.status(
//       err.status || 500
//     ).json({
//       success: false,
//       message:
//         err.message ||
//         "Internal server error",
//     });

//   }
// );


// // ======================================
// // SERVER
// // ======================================

// const PORT =
//   process.env.PORT || 5000;

// // app.listen(
// //   PORT,
// //   () => {
// //     console.log(
// //       `Server running on http://localhost:${PORT}`
// //     );
// //   }
// // );


// export default app;



import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";

dotenv.config();

const app = express();

connectDB();

const allowedOrigins = [
  "http://localhost:5173",
  "https://frontend-six-theta-mfk5dixgph.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ResolveHub API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;

