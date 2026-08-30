import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "./config/db.js";
import User from "./models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    const email = "admin@resolvehub.com";

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("This email already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(
      "Admin@123",
      10
    );

    const admin = await User.create({
      name: "Admin",
      email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully!");
    console.log(admin);

    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

createAdmin();