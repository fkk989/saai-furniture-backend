import { Response } from "express";
import { NextFncReq } from "../../../middleware";
import { PrismaSingleton } from "../../../clients/db";
import { locationInput } from "./add";

const prismaClient = PrismaSingleton.getInstance().prisma;

export async function deleteLocation(req: NextFncReq, res: Response) {
  try {
    const reqBody = req.body;

    const parsedInput = locationInput.safeParse(reqBody);

    if (!parsedInput.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid Input",
      });
    }

    const { id } = parsedInput.data;

    const locationInDb = await prismaClient.location.findUnique({
      where: { id },
    });

    if (!locationInDb) {
      return res.status(401).json({
        success: false,
        message: "no location found with that id",
      });
    }
    const location = await prismaClient.location.delete({
      where: { id: locationInDb.id },
    });

    return res.status(200).json({
      success: true,
      message: "location deleted successfully",
      location,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
