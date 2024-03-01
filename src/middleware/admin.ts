import { Response, NextFunction } from "express";
import JWT from "jsonwebtoken";
import { PrismaSingleton } from "../clients";
import { NextFncReq } from "./client";

const prismaClient = PrismaSingleton.getInstance().prisma;
const SECRET_KEY = process.env.JWT_SECRET;

// Middleware for user authentication
export const authenticateAdmin = async (
  req: NextFncReq,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized",
    });
  }

  try {
    const authToken = token.split(" ")[1];
    // Verify the JWT token
    const { email } = JWT.verify(authToken, SECRET_KEY) as { email: string };

    // Fetch user from the database
    const admin = await prismaClient.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });
    }

    req.admin = admin;
    next();
  } catch (e: any) {
    res.status(401).json({
      success: false,
      message: e.message,
    });
  }
};
