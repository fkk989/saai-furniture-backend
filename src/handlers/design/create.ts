import { Response } from "express";
import { NextFncReq } from "../../middleware";
import { PrismaSingleton } from "../../clients/db";
import { z } from "zod";
const prismaClient = PrismaSingleton.getInstance().prisma;

export const designInput = z.object({
  id: z.string().optional(),
  categoryId: z.string().optional(),
  title: z.string().max(50),
  imageUrl: z.string(),
  imageUrl2: z.string().optional(),
  imageUrl3: z.string().optional(),
  imageUrl4: z.string().optional(),
});

export async function createDesign(req: NextFncReq, res: Response) {
  try {
    const reqBody = req.body;

    const parsedInput = designInput.safeParse(reqBody);

    if (!parsedInput.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid Input",
      });
    }

    const { categoryId, title, imageUrl, imageUrl2, imageUrl3, imageUrl4 } =
      parsedInput.data;

    const designInDb = await prismaClient.sofaDesign.findUnique({
      where: { title, category: { id: categoryId } },
    });

    if (designInDb) {
      return res.status(401).json({
        success: false,
        message: "Design already exsts",
      });
    }

    const design = await prismaClient.sofaDesign.create({
      data: {
        title: title.toLowerCase(),
        imageUrl,
        imageUrl2: imageUrl2,
        imageUrl3: imageUrl3,
        imageUrl4: imageUrl4,
        category: { connect: { id: categoryId } },
      },
    });

    return res.status(200).json({
      success: true,
      message: "design created successfully",
      design,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
