import { NextFunction, Request as ExpressRequest, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constant";

// Create a Custom Type Definition for Request in Local
interface CustomRequest extends ExpressRequest {
  userId?: string;
}

export const isAuthenticated = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check the Authorization header
    let token = req.headers["authorization"]?.split(" ")[1];
    // console.log("TOKEN", token);
    if (!token) {
      // If token not found in Authorization header, check cookies
      token = req.cookies?.token;
    }
    // console.log("TOKEN", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User is not authenticated",
      });
    }

    // Verify the token
    const decoded = verify(token, JWT_SECRET!) as JwtPayload;

    // Attach the user to the request object
    req.userId = decoded.id;

    // Process the next job
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "User is not authenticated",
    });
  }
};
