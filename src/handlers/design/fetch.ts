import { Response } from "express";
import { NextFncReq } from "../../middleware";

import { PrismaSingleton } from "../../clients/db";
import { z } from "zod";
const prismaClient = PrismaSingleton.getInstance().prisma;

const fetchDesignInput = z.object({
  categoryTitle: z.string(),
});

export async function fetchDesign(req: NextFncReq, res: Response) {
  try {
    const reqBody = req.body;

    const parsedInput = fetchDesignInput.safeParse(reqBody);

    if (!parsedInput.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid Input",
      });
    }

    const { categoryTitle } = parsedInput.data;
    const designs = await prismaClient.sofaDesign.findMany({
      where: { category: { title: categoryTitle } },
      orderBy: { createdAt: "asc" },
    });

    return res.status(200).json({
      message: "fetched all designs",
      success: true,
      designs,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
