import jwt from "jsonwebtoken";

// ===============================
// Protect Route
// ===============================

export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};


// ===============================
// Admin Only
// ===============================

export const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({
      message: "Admin access required",
    });
  }

  next();
};


// ===============================
// Customer Only
// ===============================

export const customerOnly = (req, res, next) => {
  if (req.user?.role !== "customer") {
    return res.status(403).json({
      message: "Customer access required",
    });
  }

  next();
};