import { Response } from "express";
import { NextFncReq } from "../../../middleware";
import { PrismaSingleton } from "../../../clients/db";
import { string, z } from "zod";

const prismaClient = PrismaSingleton.getInstance().prisma;

const fetchCityInput = z.object({
  stateId: z.string(),
});

export async function fetchCityByState(req: NextFncReq, res: Response) {
  try {
    const reqBody = req.body;

    const parsedInput = fetchCityInput.safeParse(reqBody);

    if (!parsedInput.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid Input",
      });
    }

    const { stateId } = parsedInput.data;

    const cities = await prismaClient.city.findMany({
      where: { state: { id: stateId } },
      include: {
        locations: true,
      },
      orderBy: { createdAt: "asc" },
    });

    if (!cities) {
      return res.status(401).json({
        success: false,
        message: "no city found in that location",
      });
    }

    return res.status(200).json({
      success: true,
      message: "fetched city successfuly",
      cities,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
