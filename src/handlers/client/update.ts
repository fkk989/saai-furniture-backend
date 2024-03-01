import { Client, User } from "@prisma/client";
import { Response } from "express";
import { NextFncReq } from "../../middleware";
import { PrismaSingleton } from "../../clients/db";
import { z } from "zod";
const prismaClient = PrismaSingleton.getInstance().prisma;

const updateClientInput = z.object({
  name: z.string().max(30),
});

export async function updateClient(req: NextFncReq, res: Response) {
  try {
    const { client, body } = req as {
      client: Client;
      body: {
        name: string;
        password: string;
      };
    };

    const parsedInput = updateClientInput.safeParse(body);

    if (!parsedInput.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid Input",
      });
    }

    const { name } = parsedInput.data;

    const updateClient = await prismaClient.client.update({
      where: { email: client.email },
      data: {
        name,
      },
    });

    return res.status(200).json({
      success: true,
      message: "updated profile",
      client: updateClient,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
