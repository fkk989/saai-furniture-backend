import { Response } from "express";
import { NextFncReq } from "../../../middleware";
import { PrismaSingleton } from "../../../clients/db";

const prismaClient = PrismaSingleton.getInstance().prisma;

export async function fetchCity(req: NextFncReq, res: Response) {
  try {
    const cities = await prismaClient.city.findMany({
      include: { locations: true },
      orderBy: { createdAt: "asc" },
    });

    if (!cities) {
      return res.status(401).json({
        success: false,
        message: "no city found in that location",
      });
    }

    return res.status(200).json({
      success: true,
      message: "fetched city successfuly",
      cities,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
