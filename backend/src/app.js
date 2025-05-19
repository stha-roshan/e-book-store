import express from "express";

const app = express();

import userRoutes from "./routes/user.routes.js";

app.use("/ebookstore/api/users", userRoutes);
export { app };
