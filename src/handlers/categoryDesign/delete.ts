import { Response } from "express";
import { NextFncReq } from "../../middleware";
import { PrismaSingleton } from "../../clients/db";
import { z } from "zod";

const prismaClient = PrismaSingleton.getInstance().prisma;

export const deleteDesignInput = z.object({
  title: z.string(),
});
export async function deleteDesign(req: NextFncReq, res: Response) {
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

    const deletedDesign = await prismaClient.sofaDesign.delete({
      where: { title },
    });
    return res.status(200).json({
      message: "design deleted successfully",
      success: true,
      design: deletedDesign,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
