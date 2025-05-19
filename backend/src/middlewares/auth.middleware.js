import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
const verifyUser = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Un-authorized ",
      });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select("name email");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found. Invalid token.",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: "Token has expired. Please log in again.",
      });
    }
    console.error("JWT verification error --> ", error.message);
    return res.status(500).json({
      success: false,
      message: "Error while verifying jwt",
    });
  }
};


export { verifyUser }