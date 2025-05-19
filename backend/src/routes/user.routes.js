import { Router } from "express";
import multer from "multer";
import { registerUser, loginUser } from "../controllers/user.controller.js";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();
const upload = multer();

router.post("/signup", upload.none(), registerUser);
router.post("/login", upload.none(), loginUser);


router.get('/login', (req, res) => {
    const loginPagePath = path.join(__dirname, "../../../frontend/templetes/login.html")
    res.sendFile(loginPagePath)
})

export default router;
