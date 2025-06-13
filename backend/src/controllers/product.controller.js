import { Product } from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createProduct = async (req, res) => {
  const errors = [];
  try {
    // console.log(req.body)
    // console.log(req.file)
    const { name, price, description } = req.body;
    const image = req.file;

    if (!name) {
      errors.push("Name is required");
    }

    if (price === undefined || isNaN(price)) {
      errors.push("Valid price is required");
    }

    if (!description) {
      errors.push("description is required");
    }

    if (!image) {
      errors.push("image is required");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        errors: errors,
      });
    }

    const signedImage = await uploadOnCloudinary(image.path);
    if (!signedImage) {
      return res.status(500).json({
        success: false,
        message: "Image upload failed",
      });
    }
    const signedImageUrl = signedImage.secure_url;

    const newProduct = await Product.create({
      name: name,
      price: price,
      description: description,
      image: signedImageUrl,
    });

    const createdProduct = await Product.findById(newProduct._id);

    if (!createdProduct) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while creating product",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: createdProduct,
    });
  } catch (error) {
    console.log("Product creation error: ", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occured while creating product",
    });
  }
};

const fetchProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products: allProducts,
    });
  } catch (error) {
    console.log("Something went wrong while fetching products", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching products",
    });
  }
};

const findProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      console.log(`Product Id is requires`);
      return res.status(400).json({
        success: false,
        message: "Product id is required",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      console.log(`Product with id: ${productId} not fount`);
      return res.status(404).json({
        success: false,
        message: "Product Not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product found",
      product: product,
    });
  } catch (error) {
    console.log("something went wrong searching product", error);
    return res.status(500).json({
      success: false,
      message: "An error occured while searching product",
    });
  }
};
export { createProduct, fetchProducts, findProduct };
