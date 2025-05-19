import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_CONNECTION_STRING}/${process.env.DB_NAME}`
    );
    console.log(
      `\nMONGODB CONNECTED SUCCESSFULLY !! DB HOST : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("\nERROR while CONNECTING to MONGODB !!!");
    process.exit(1);
  }
};

export { connectDB };
