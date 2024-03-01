import { Response } from "express";
import { NextFncReq } from "../../middleware";
import { PrismaSingleton } from "../../clients/db";
import { categoryInput } from "./create";

const prismaClient = PrismaSingleton.getInstance().prisma;

export async function updateCategory(req: NextFncReq, res: Response) {
  try {
    const reqBody = req.body;

    const parsedInput = categoryInput.safeParse(reqBody);

    if (!parsedInput.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid Input",
      });
    }
    const { id, title, imageUrl } = parsedInput.data;

    const task = await prismaClient.sofaCategory.findUnique({
      where: { id },
    });

    if (!task) {
      return res.status(401).json({
        success: false,
        message: "no category found",
      });
    }

    const updatedCategory = await prismaClient.sofaCategory.update({
      where: { id },
      data: {
        title,
        imageUrl,
      },
    });

    return res.status(200).json({
      message: "category detail updated",
      success: true,
      category: updatedCategory,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
