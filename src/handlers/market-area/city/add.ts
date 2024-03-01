import { Response } from "express";
import { NextFncReq } from "../../../middleware";
import { PrismaSingleton } from "../../../clients/db";
import { z } from "zod";
const prismaClient = PrismaSingleton.getInstance().prisma;

export const cityIput = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});

export async function addCity(req: NextFncReq, res: Response) {
  try {
    const reqBody = req.body;

    const parsedInput = cityIput.safeParse(reqBody);

    if (!parsedInput.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid Input",
      });
    }

    const { name, id } = parsedInput.data;

    const city = await prismaClient.city.create({
      data: {
        name: name!,
        state: { connect: { id } },
      },
    });

    return res.status(200).json({
      success: true,
      message: "city created successfully",
      city,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
