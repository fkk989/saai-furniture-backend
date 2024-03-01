import { Client, SubClient, User } from "@prisma/client";
import { Response } from "express";
import { NextFncReq } from "../../middleware";
import { PrismaSingleton } from "../../clients/db";
import { z } from "zod";
const prismaClient = PrismaSingleton.getInstance().prisma;

const updateSubClientInput = z.object({
  name: z.string().max(30),
});

export async function updateSubClient(req: NextFncReq, res: Response) {
  try {
    const { subClient, body } = req as {
      subClient: SubClient;
      body: {
        name: string;
        password: string;
      };
    };

    const parsedInput = updateSubClientInput.safeParse(body);

    if (!parsedInput.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid Input",
      });
    }

    const { name } = parsedInput.data;

    const updatedClient = await prismaClient.subClient.update({
      where: { email: subClient.email },
      data: {
        name,
      },
    });

    return res.status(200).json({
      success: true,
      message: "updated profile",
      client: updatedClient,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
