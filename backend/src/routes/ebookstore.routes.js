import { Router } from "express";
import { verifyUser } from "../middlewares/auth.middleware.js";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router()

router.get('/home', verifyUser, (req, res) => {
    const homePagePath = path.join(__dirname, "../../../frontend/templetes/index.html")
    res.sendFile(homePagePath)
})

export default router