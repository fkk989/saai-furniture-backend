import { Response } from "express";
import { NextFncReq } from "../../middleware";
import { PrismaSingleton } from "../../clients/db";
import { z } from "zod";
const prismaClient = PrismaSingleton.getInstance().prisma;

export const categoryInput = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string().max(510),
  title1: z.string().optional(),
  title2: z.string().optional(),
  title3: z.string().optional(),
  title4: z.string().optional(),
  para1: z.string().optional(),
  para2: z.string().optional(),
  para3: z.string().optional(),
  para4: z.string().optional(),
  imageUrl: z.string(),
  popular: z.boolean(),
});

export async function createCategory(req: NextFncReq, res: Response) {
  try {
    const reqBody = req.body;

    const parsedInput = categoryInput.safeParse(reqBody);

    if (!parsedInput.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid Input",
      });
    }

    const {
      title,
      imageUrl,
      description,
      title1,
      title2,
      title3,
      title4,
      para1,
      para2,
      para3,
      para4,
      popular,
    } = parsedInput.data;

    const category = await prismaClient.sofaCategory.create({
      data: {
        title,
        description,
        title1,
        title2,
        title3,
        title4,
        para1,
        para2,
        para3,
        para4,
        imageUrl,
        popular,
      },
    });

    return res.status(200).json({
      success: true,
      message: "category created successfully",
      category,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
