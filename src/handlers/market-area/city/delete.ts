import { Response } from "express";
import { NextFncReq } from "../../../middleware";
import { PrismaSingleton } from "../../../clients/db";
import { cityIput } from "./add";

const prismaClient = PrismaSingleton.getInstance().prisma;

export async function deleteCity(req: NextFncReq, res: Response) {
  try {
    const reqBody = req.body;

    const parsedInput = cityIput.safeParse(reqBody);

    if (!parsedInput.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid Input",
      });
    }

    const { id } = parsedInput.data;

    const cityInDb = await prismaClient.city.findUnique({ where: { id } });

    if (!cityInDb) {
      return res.status(401).json({
        success: false,
        message: "no city found with that id",
      });
    }
    const city = await prismaClient.city.delete({
      where: { id: cityInDb.id },
    });

    return res.status(200).json({
      success: true,
      message: "city deleted successfully",
      city,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
