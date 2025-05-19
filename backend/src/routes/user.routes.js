import { Router } from "express";
import multer from "multer";
import { registerUser, loginUser } from "../controllers/user.controller.js";

const router = Router();
const upload = multer();

router.post("/signup", upload.none(), registerUser);
router.post("/login", upload.none(), loginUser);

export default router;
