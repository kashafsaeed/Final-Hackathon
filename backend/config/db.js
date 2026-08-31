
// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);

//     console.log("MongoDB connected successfully");
//   } catch (error) {
//     console.error(
//       "MongoDB connection failed:",
//       error.message
//     );

//     process.exit(1);
//   }
// };

// export default connectDB;


import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const connection =
      await mongoose.connect(
        process.env.MONGO_URI
      );

    isConnected =
      connection.connection.readyState === 1;

    console.log(
      "MongoDB connected"
    );

  } catch (error) {
    console.error(
      "MongoDB Error:",
      error.message
    );

    throw error;
  }
};

export default connectDB;