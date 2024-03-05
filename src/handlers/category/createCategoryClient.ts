import { Response } from "express";
import { NextFncReq } from "../../middleware";
import { PrismaSingleton } from "../../clients/db";
import { z } from "zod";
import { categoryInput } from "./create";
const prismaClient = PrismaSingleton.getInstance().prisma;

export async function createCategoryClient(req: NextFncReq, res: Response) {
  try {
    const client = req.client;
    const subClient = req.subClient;
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

    const categoryCount = await prismaClient.sofaCategory.count();

    if (client) {
      if (categoryCount >= client.categoryLimit) {
        return res.status(401).json({
          success: false,
          message: "category limit reached",
        });
      }
    }

    if (subClient) {
      if (categoryCount >= subClient.categoryLimit) {
        return res.status(401).json({
          success: false,
          message: "category limit reached",
        });
      }
    }

    const category = await prismaClient.sofaCategory.create({
      data: {
        title: title.toLowerCase(),
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
