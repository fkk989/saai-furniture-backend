import { PrismaSingleton } from "../../clients/db";
import { Request, Response } from "express";

const prismaClient = PrismaSingleton.getInstance().prisma;

export async function fetchAllSubClient(req: Request, res: Response) {
  try {
    const allSubClients = await prismaClient.subClient.findMany({
      orderBy: { createdAt: "asc" },
    });
    if (!allSubClients) {
      return res.status(401).json({
        success: false,
        message: "no admins right now",
      });
    }

    return res.status(200).json({
      success: true,
      message: "fetched all admins",
      clients: allSubClients,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
