import { Router } from "express";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { createProduct, fetchProducts, findProduct } from "../controllers/product.controller.js";
import { createTransaction, createSignature } from "../controllers/transaction.controller.js";
import { createOrder } from "../controllers/order.controller.js";
import multer from "multer";

import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router()
const upload = multer({dest: './uploads'})

//++++++++++++++++++++++++=gets++++++++++++++++++++++++++++++++++

router.get('/home', (req, res) => {
    const homePagePath = path.join(__dirname, "../../../frontend/templetes/index.html")
    res.sendFile(homePagePath)
})

//admin should be logged in to access this 
router.get('/products/create', (req, res) => {
    const createProductPath = path.join(__dirname, "../../../frontend/templetes/createProduct.html")
    res.sendFile(createProductPath)
})

router.get('/products', (req, res) => {
    const productsPath = path.join(__dirname, "../../../frontend/templetes/products.html")
    res.sendFile(productsPath)
})
router.get('/products/fetch', fetchProducts)



//+++++++++++++++++++++++++posts++++++++++++++++++++++++++++

router.post('/createTransaction', verifyUser, upload.none(), createTransaction)
router.post('/findProduct', upload.none(), findProduct)

//admin should be loged in 
router.post('/products/create', upload.single('image'), createProduct)
router.post('/placeOrder', verifyUser, upload.none(), createOrder)
router.post('/createSignature', upload.none(), createSignature)

export default router