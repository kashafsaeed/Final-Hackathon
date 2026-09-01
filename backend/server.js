
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









// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";

// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
// import ticketRoutes from "./routes/ticketRoutes.js";

// dotenv.config();

// const app = express();

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://final-hackathon-gm86.vercel.app",
// ];

// app.use(
//   cors({
//     origin: allowedOrigins,
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

//   res.status(500).json({
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

// const allowedOrigins = [
//   // "http://localhost:5173",
//   // "https://frontend-six-theta-mfk5dixgph.vercel.app",
//   // "https://final-hackathon-gm86.vercel.app",
//   // "https://final-hackathon-fpv1.vercel.app",
//   "http://localhost:5173",
//   "https://frontend-six-theta-mfk5dixgph.vercel.app",
//   "https://final-hackathon-gm86.vercel.app",
//   "https://final-hackathon-fpv1.vercel.app",
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     origin: true,
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

//   res.status(500).json({
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
// // MongoDB Connection
// // ===============================
// connectDB();

// // ===============================
// // CORS
// // ===============================
// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://frontend-six-theta-mfk5dixgph.vercel.app",
//   "https://final-hackathon-gm86.vercel.app",
//   "https://final-hackathon-fpv1.vercel.app",
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
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
// // Test Route
// // ===============================
// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "ResolveHub API is running",
//   });
// });

// // ===============================
// // API Routes
// // ===============================
// app.use("/api/auth", authRoutes);
// app.use("/api/tickets", ticketRoutes);

// // ===============================
// // 404 Handler
// // ===============================
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: `Route not found: ${req.method} ${req.originalUrl}`,
//   });
// });

// // ===============================
// // Error Handler
// // ===============================
// app.use((err, req, res, next) => {
//   console.error("Server Error:", err);

//   res.status(err.status || 500).json({
//     success: false,
//     message: err.message || "Internal server error",
//   });
// });

// // ===============================
// // Local Development
// // ===============================
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
// // CORS Configuration (Bulletproof)
// // ===============================
// const allowedOrigins = [
//   "http://localhost:5173",
//   "http://localhost:3000",
//   "https://frontend-six-theta-mfk5dixgph.vercel.app",
//   "https://final-hackathon-gm86.vercel.app",
//   "https://final-hackathon-fpv1.vercel.app",
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Allow requests with no origin (like mobile apps, curl, postman)
//       if (!origin) return callback(null, true);
      
//       const cleanOrigin = origin.replace(/\/$/, "");
//       if (allowedOrigins.some(o => o.replace(/\/$/, "") === cleanOrigin)) {
//         return callback(null, true);
//       }
//       return callback(null, true); // Fallback to allow during deployment debugging
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
//   })
// );

// // Pre-flight requests
// app.options("*", cors());

// // ===============================
// // Middleware
// // ===============================
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Ensure DB is connected before processing requests on Vercel
// app.use(async (req, res, next) => {
//   try {
//     await connectDB();
//     next();
//   } catch (error) {
//     console.error("Database connection middleware error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Database connection failed",
//       error: error.message,
//     });
//   }
// });

// // ===============================
// // Root / Health Route
// // ===============================
// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "ResolveHub API is running smoothly!",
//     timestamp: new Date().toISOString(),
//   });
// });

// app.get("/api", (req, res) => {
//   res.json({
//     success: true,
//     message: "ResolveHub API Base Endpoint",
//   });
// });

// // ===============================
// // API Routes
// // ===============================
// app.use("/api/auth", authRoutes);
// app.use("/api/tickets", ticketRoutes);

// // ===============================
// // 404 Handler
// // ===============================
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: `Route not found: ${req.method} ${req.originalUrl}`,
//   });
// });

// // ===============================
// // Global Error Handler
// // ===============================
// app.use((err, req, res, next) => {
//   console.error("Server Global Error:", err);

//   res.status(err.status || 500).json({
//     success: false,
//     message: err.message || "Internal server error",
//   });
// });

// // ===============================
// // Local Development Server
// // ===============================
// const PORT = process.env.PORT || 5000;

// if (process.env.NODE_ENV !== "production") {
//   app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//   });
// }

// export default app;


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";

dotenv.config();

const app = express();

// ===============================
// Allowed Origins
// ===============================
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://frontend-six-theta-mfk5dixgph.vercel.app",
  "https://final-hackathon-gm86.vercel.app",
  "https://final-hackathon-fpv1.vercel.app",
];

// ===============================
// CORS Middleware (FIRST)
// ===============================
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (!origin || allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
  } else {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With, Accept"
  );

  // Preflight OPTIONS fast return
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// MongoDB Cached Connection
// ===============================
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    cached.promise = mongoose
      .connect(uri, {
        serverSelectionTimeoutMS: 5000,
        bufferCommands: false,
      })
      .then((mongooseInstance) => {
        console.log("MongoDB connected");
        return mongooseInstance;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Ensure DB connected on requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("DB Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
    });
  }
});

// ===============================
// Test / Health Route
// ===============================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ResolveHub API is running",
    database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  });
});

// ===============================
// API Routes
// ===============================
app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);

// ===============================
// 404 Handler
// ===============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ===============================
// Error Handler
// ===============================
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;