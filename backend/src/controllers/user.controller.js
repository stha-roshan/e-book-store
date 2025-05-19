import { User } from "../models/user.model.js";

const emailRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const nameRegex = /^[A-Za-z\s'-]+$/;
const phoneNumberRegex = /^(98|97)[0-9]{8}$/;
const validationErrors = [];

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    if (!nameRegex.test(firstName) || !firstName.trim()) {
      validationErrors.push("Invalid first name format");
    }

    if (!nameRegex.test(lastName) || !firstName.trim()) {
      validationErrors.push("Invalid last name format");
    }

    if (!emailRegex.test(email)) {
      validationErrors.push("Invalid email");
    }

    if (!phoneNumberRegex.test(String(phoneNumber))) {
      validationErrors.push(
        "Phone number must contain 10 numbers and starts form 98 || 97"
      );
    }

    if (!password || password.length < 8) {
      validationErrors.push("password must be at least 8 characters long");
    }

    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: validationErrors,
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const newUser = await User.create({
      name: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      phoneNumber: phoneNumber,
      password: password,
    });

    const createdUser = await User.findById(newUser._id).select("-password");

    if (!createdUser) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while creating user",
      });
    }

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: createdUser,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during registration",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Cannot find user with this email",
      });
    }

    if (user.password != password) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    console.log("login successfull");
    return res.status(200).json({
      success: true,
      message: "login Successfull",
    });
  } catch (error) {
    console.error("failed to login", error.message);
  }
};

export { registerUser, loginUser };
