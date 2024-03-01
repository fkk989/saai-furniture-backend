import { Response, NextFunction } from "express";
import JWT from "jsonwebtoken";
import { PrismaSingleton } from "../clients";
import { NextFncReq } from "./client";

const SECRET_KEY = process.env.JWT_SECRET;
const prismaClient = PrismaSingleton.getInstance().prisma;

// Middleware for user authentication
export const authenticateSubClient = async (
  req: NextFncReq,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "no token",
    });
  }

  try {
    const authToken = token.split(" ")[1];
    // Verify the JWT token
    const { email } = JWT.verify(authToken, SECRET_KEY) as { email: string };

    // Fetch subClient from the database
    const subClient = await prismaClient.subClient.findUnique({
      where: { email },
    });

    if (!subClient) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });
    }

    req.subClient = subClient;
    next();
  } catch (e: any) {
    res.status(401).json({
      success: false,
      message: e.message,
    });
  }
};
