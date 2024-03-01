import { Response } from "express";
import { NextFncReq } from "../../middleware";

import { PrismaSingleton } from "../../clients/db";
const prismaClient = PrismaSingleton.getInstance().prisma;

export async function fetchPopularCategory(req: NextFncReq, res: Response) {
  try {
    const categories = await prismaClient.sofaCategory.findMany({
      where: { popular: true },
      orderBy: {
        createdAt: "asc",
      },
    });

    return res.status(200).json({
      success: true,
      categories,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
