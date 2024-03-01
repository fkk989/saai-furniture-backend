import { Response } from "express";
import { NextFncReq } from "../../../middleware";
import { PrismaSingleton } from "../../../clients/db";
import { z } from "zod";
const prismaClient = PrismaSingleton.getInstance().prisma;

export const locationInput = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});

export async function addLocation(req: NextFncReq, res: Response) {
  try {
    const reqBody = req.body;

    const parsedInput = locationInput.safeParse(reqBody);

    if (!parsedInput.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid Input",
      });
    }

    const { id, name } = parsedInput.data;

    const location = await prismaClient.location.create({
      data: {
        name: name!,
        city: { connect: { id } },
      },
    });

    return res.status(200).json({
      success: true,
      message: "location created successfully",
      location,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
