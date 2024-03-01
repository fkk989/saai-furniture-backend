import { Response } from "express";
import { NextFncReq } from "../../../middleware";
import { PrismaSingleton } from "../../../clients/db";
import { locationInput } from "./add";

const prismaClient = PrismaSingleton.getInstance().prisma;

export async function updateLocation(req: NextFncReq, res: Response) {
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

    const locationInDb = await prismaClient.location.findUnique({
      where: { id },
    });

    if (!locationInDb) {
      return res.status(401).json({
        success: false,
        message: "no location found with that name",
      });
    }
    const location = await prismaClient.location.update({
      where: { id },
      data: {
        name: name!,
      },
    });

    return res.status(200).json({
      success: true,
      message: "location updated successfully",
      location,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
