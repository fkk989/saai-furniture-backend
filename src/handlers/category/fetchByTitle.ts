import { Response } from "express";
import { NextFncReq } from "../../middleware";
import { PrismaSingleton } from "../../clients/db";
import { deleteCategoryInput } from "./delete";
const prismaClient = PrismaSingleton.getInstance().prisma;

export async function fetchCategoryByTitle(req: NextFncReq, res: Response) {
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

    const category = await prismaClient.sofaCategory.findUnique({
      where: { title },
    });

    if (!category) {
      return res.status(401).json({
        success: false,
        message: "no category found",
      });
    }

    return res.status(200).json({
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
