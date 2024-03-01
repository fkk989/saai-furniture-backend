import { Response } from "express";
import { NextFncReq } from "../../middleware";
import { PrismaSingleton } from "../../clients/db";
import { deleteDesignInput } from "./delete";
const prismaClient = PrismaSingleton.getInstance().prisma;

export async function fetchDesignByTitle(req: NextFncReq, res: Response) {
  try {
    const reqBody = req.body;

    const parsedInput = deleteDesignInput.safeParse(reqBody);

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
