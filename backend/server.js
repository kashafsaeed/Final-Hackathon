
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



// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";

// import connectDB from "./config/db.js";

// import authRoutes from "./routes/authRoutes.js";
// import ticketRoutes from "./routes/ticketRoutes.js";

// dotenv.config();

// const app = express();

// connectDB();

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://frontend-six-theta-mfk5dixgph.vercel.app",
// ];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

// app.use(express.json());

// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "ResolveHub API is running",
//   });
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/tickets", ticketRoutes);

// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: `Route not found: ${req.method} ${req.originalUrl}`,
//   });
// });

// app.use((err, req, res, next) => {
//   console.error("Server Error:", err);
//   res.status(err.status || 500).json({
//     success: false,
//     message: err.message || "Internal server error",
//   });
// });

// const PORT = process.env.PORT || 5000;

// if (process.env.NODE_ENV !== "production") {
//   app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//   });
// }

// export default app;

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";

// import connectDB from "./config/db.js";

// import authRoutes from "./routes/authRoutes.js";
// import ticketRoutes from "./routes/ticketRoutes.js";

// dotenv.config();

// const app = express();


// // ===============================
// // CORS
// // ===============================

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://final-hackathon-gm86.vercel.app/login",
// ];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (
//         !origin ||
//         allowedOrigins.includes(origin)
//       ) {
//         callback(null, true);
//       } else {
//         callback(null, false);
//       }
//     },
//     credentials: true,
//   })
// );


// // ===============================
// // Middleware
// // ===============================

// app.use(express.json());


// // ===============================
// // Database
// // ===============================

// app.use(async (req, res, next) => {
//   try {
//     await connectDB();
//     next();
//   } catch (error) {
//     console.error(
//       "MongoDB connection failed:",
//       error.message
//     );

//     res.status(500).json({
//       success: false,
//       message: "Database connection failed",
//     });
//   }
// });


// // ===============================
// // Test
// // ===============================

// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "ResolveHub API is running",
//   });
// });


// // ===============================
// // AUTH
// // ===============================

// app.use(
//   "/api/auth",
//   authRoutes
// );


// // ===============================
// // TICKETS
// // ===============================

// app.use(
//   "/api/tickets",
//   ticketRoutes
// );


// // ===============================
// // 404
// // ===============================

// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: `Route not found: ${req.method} ${req.originalUrl}`,
//   });
// });


// // ===============================
// // ERROR
// // ===============================

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


// // ===============================
// // LOCAL SERVER
// // ===============================

// const PORT =
//   process.env.PORT || 5000;

// if (
//   process.env.NODE_ENV !==
//   "production"
// ) {
//   app.listen(PORT, () => {
//     console.log(
//       `Server running on http://localhost:${PORT}`
//     );
//   });
// }


// export default app;









import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://final-hackathon-gm86.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
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

  res.status(500).json({
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