import { Response } from "express";
import { NextFncReq } from "../../middleware";
import { PrismaSingleton } from "../../clients/db";
import { z } from "zod";
const prismaClient = PrismaSingleton.getInstance().prisma;

const fetchInput = z.object({
  title: z.string(),
});

export async function fetchDesignByTitle(req: NextFncReq, res: Response) {
  try {
    const reqBody = req.body;

    const parsedInput = fetchInput.safeParse(reqBody);

    if (!parsedInput.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid Input",
      });
    }

    const { title } = parsedInput.data;

    const design = await prismaClient.sofaDesign.findUnique({
      where: { title },
    });
    if (!design) {
      return res.status(401).json({
        success: false,
        message: "no design found",
      });
    }
    return res.status(200).json({
      message: "fetched design successfully",
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
