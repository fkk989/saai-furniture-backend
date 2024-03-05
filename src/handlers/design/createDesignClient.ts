import { Response } from "express";
import { NextFncReq } from "../../middleware";
import { PrismaSingleton } from "../../clients/db";
import { z } from "zod";
import { designInput } from "./create";
const prismaClient = PrismaSingleton.getInstance().prisma;

export async function createDesignClient(req: NextFncReq, res: Response) {
  try {
    const client = req.client;
    const subClient = req.subClient;
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

    const categoryCount = await prismaClient.sofaDesign.count({
      where: {
        category: { id: categoryId },
      },
    });

    if (client) {
      if (categoryCount >= client.designLimit) {
        return res.status(401).json({
          success: false,
          message: "design limit reached",
        });
      }
    }

    if (subClient) {
      if (categoryCount >= subClient.designLimit) {
        return res.status(401).json({
          success: false,
          message: "design limit reached",
        });
      }
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
