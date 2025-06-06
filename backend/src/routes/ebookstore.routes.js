import { Router } from "express";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { createProduct } from "../controllers/product.controller.js";
import multer from "multer";

import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router()
const upload = multer({dest: './uploads'})

router.get('/home', verifyUser, (req, res) => {
    const homePagePath = path.join(__dirname, "../../../frontend/templetes/index.html")
    res.sendFile(homePagePath)
})

router.get('/products/create', (req, res) => {
    const createProductPath = path.join(__dirname, "../../../frontend/templetes/createProduct.html")
    res.sendFile(createProductPath)
})

router.post('/products/create', upload.single('image'), createProduct)

export default router