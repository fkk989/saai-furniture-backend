import { Response } from "express";
import { NextFncReq } from "../../middleware";
import { PrismaSingleton } from "../../clients/db";
import { designInput } from "./create";
const prismaClient = PrismaSingleton.getInstance().prisma;

export async function updateDesign(req: NextFncReq, res: Response) {
  try {
    const reqBody = req.body;

    const parsedInput = designInput.safeParse(reqBody);

    if (!parsedInput.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid Input",
      });
    }

    const { id, title, imageUrl } = parsedInput.data;

    const designInDb = await prismaClient.sofaDesign.findUnique({
      where: { id },
    });

    if (!designInDb) {
      return res.status(401).json({
        success: false,
        message: "no design found",
      });
    }

    const design = await prismaClient.sofaDesign.update({
      where: { id: designInDb.id },
      data: {
        title,
        imageUrl,
      },
    });

    return res.status(200).json({
      message: "design detail updated",
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
