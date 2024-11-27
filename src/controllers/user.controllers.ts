import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constant";
import {
  TSignupSchema,
  signupSchema,
  TSigninSchema,
  signinSchema,
} from "./../schemas/user.schemas";

// API 1: Signup
export const signup = async (req: any, res: any) => {
  try {
    // Zod validation
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(403).json({
        success: false,
        message: parsed.error.issues[0].message,
      });
    }

    const { username, password, confirmPassword }: TSignupSchema = req.body;

    // Check if user already exists
    const user = await UserModel.findOne({ username });
    if (user) {
      return res.status(403).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      username,
      password: hashedPassword,
    });

    // Check if new user is created
    if (!newUser) {
      return res.status(403).json({
        success: false,
        message: "User creation failed",
      });
    }

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// API 2: Login
export const signin = async (req: any, res: any) => {
  try {
    // Zod validation apply later
    const parsed = signinSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(403).json({
        success: false,
        message: parsed.error.issues[0].message,
      });
    }

    const { username, password }: TSigninSchema = req.body;

    // Check if user exists
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "User does not exist",
      });
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET!, {
      expiresIn: "1d",
    });

    // Set cookie for authentication
    res.cookie("token", token, user._id, {
      httpOnly: true, // only accessible by the server
      secure: true, // only sent over HTTPS
      expires: "1d", // 24 hours
    });

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// API 3: Logout
export const signout = async (req: any, res: any) => {
  try {
    // console.log("User ID:", req.userId);
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
    });
    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// API 4: AuthCheck
export const checkAuth = async (req: any, res: any) => {
  try {
    // If the request reaches here, it means the user is authenticated
    // because it has passed through the isAuthenticated middleware

    // Todo: I will share the User information for Roles Based Authentication later
    res.status(200).json({
      success: true,
      isAuthenticated: true,
      message: "User is authenticated",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      isAuthenticated: false,
      message: "An error occurred while checking authentication",
    });
  }
};
