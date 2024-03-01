import { Response } from "express";
import { NextFncReq } from "../../middleware";

import { PrismaSingleton } from "../../clients/db";
import { z } from "zod";
const prismaClient = PrismaSingleton.getInstance().prisma;

export const deleteCategoryInput = z.object({
  title: z.string(),
});

export async function deleteCategory(req: NextFncReq, res: Response) {
  try {
    const reqBody = req.body;

    const parsedInput = deleteCategoryInput.safeParse(reqBody);

    if (!parsedInput.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid Input",
      });
    }

    const { title } = parsedInput.data;

    const category = await prismaClient.sofaCategory.delete({
      where: { title },
    });
    return res.status(200).json({
      message: "category deleted successfully",
      success: true,
      category,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
