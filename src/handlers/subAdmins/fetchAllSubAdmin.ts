import { PrismaSingleton } from "../../clients/db";
import { Request, Response } from "express";

const prismaClient = PrismaSingleton.getInstance().prisma;

export async function fetchAllSubAdmin(req: Request, res: Response) {
  try {
    const allSubAdmins = await prismaClient.subAdmin.findMany({
      orderBy: { createdAt: "asc" },
    });
    if (!allSubAdmins) {
      return res.status(401).json({
        success: false,
        message: "no admins right now",
      });
    }

    return res.status(200).json({
      success: true,
      message: "fetched all admins",
      admins: allSubAdmins,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
