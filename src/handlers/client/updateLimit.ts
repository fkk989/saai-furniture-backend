import { Client, User } from "@prisma/client";
import { Response } from "express";
import { NextFncReq } from "../../middleware";
import { PrismaSingleton } from "../../clients/db";
import { z } from "zod";
const prismaClient = PrismaSingleton.getInstance().prisma;

const updateClientInput = z.object({
  categoryLimit: z.number(),
  designLimit: z.number(),
});

export async function updateClientLimit(req: NextFncReq, res: Response) {
  try {
    const { client, body } = req as {
      client: Client;
      body: any;
    };

    const parsedInput = updateClientInput.safeParse(body);

    if (!parsedInput.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid Input",
      });
    }

    const { categoryLimit, designLimit } = parsedInput.data;

    const updateClient = await prismaClient.client.updateMany({
      data: {
        categoryLimit,
        designLimit,
      },
    });

    const updateSubClient = await prismaClient.subClient.updateMany({
      data: {
        categoryLimit,
        designLimit,
      },
    });

    return res.status(200).json({
      success: true,
      message: "updated limit",
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
