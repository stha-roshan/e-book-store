import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import { app } from "./app.js";
import { connectDB } from "./db/db.js";

const startServer = async () => {
  try {
    await connectDB();
    console.log("\nMongoDB Connection established Successfully!");

    app.listen(process.env.PORT, () => {
      console.log(
        `SERVER is up and running on http://localhost:${process.env.PORT}\n`
      );
    });
  } catch (error) {
    console.error(`Failed to start the server :: Detail -> `, error.message);
    process.exit(1);
  }
};

startServer();
