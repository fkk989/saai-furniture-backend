import { Response } from "express";
import { NextFncReq } from "../../../middleware";
import { PrismaSingleton } from "../../../clients/db";
import { z } from "zod";
const prismaClient = PrismaSingleton.getInstance().prisma;

const fetchLocationInput = z.object({
  cityId: z.string(),
});

export async function fetchLocation(req: NextFncReq, res: Response) {
  try {
    const reqBody = req.body;

    const parsedInput = fetchLocationInput.safeParse(reqBody);

    if (!parsedInput.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid Input",
      });
    }

    const { cityId } = parsedInput.data;

    const locations = await prismaClient.location.findMany({
      where: { city: { id: cityId } },
      orderBy: { createdAt: "asc" },
    });

    if (!locations) {
      return res.status(401).json({
        success: false,
        message: "no location found in that city",
      });
    }

    return res.status(200).json({
      success: true,
      message: "fetched all location in that city",
      locations,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
