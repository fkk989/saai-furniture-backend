import { Admin, Client, SubAdmin, SubClient, User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";
import { PrismaSingleton } from "../clients";

const prismaClient = PrismaSingleton.getInstance().prisma;

export interface NextFncReq extends Request {
  client?: Client;
  subClient?: SubClient;
  admin?: Admin;
  subAdmin?: SubAdmin;
}

const SECRET_KEY = process.env.JWT_SECRET;

// Middleware for user authentication
export const authenticateClient = async (
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

    // Fetch user from the database
    const client = await prismaClient.client.findUnique({
      where: { email },
    });

    if (!client) {
      return res.status(401).json({
        success: false,
        message: "no client found",
      });
    }

    req.client = client;
    next();
  } catch (e: any) {
    res.status(401).json({
      success: false,
      message: e.message,
    });
  }
};
