import { Response } from "express";
import { NextFncReq } from "../../middleware";

import { PrismaSingleton } from "../../clients/db";
const prismaClient = PrismaSingleton.getInstance().prisma;

export async function fetchDesign(req: NextFncReq, res: Response) {
  try {
    const { id } = req.body as {
      id: string;
    };
    const design = await prismaClient.sofaDesign.findMany({
      where: { category: { id, popular: true } },
      orderBy: { createdAt: "asc" },
    });

    return res.status(200).json({
      message: "fetched all designs",
      success: true,
      design,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
