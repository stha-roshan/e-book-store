import express from "express";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, '../../frontend')));
app.use(express.json())


import userRoutes from "./routes/user.routes.js";

app.use("/ebookstore/api/users", userRoutes);
export { app };
