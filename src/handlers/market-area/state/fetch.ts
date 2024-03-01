import { Response } from "express";
import { NextFncReq } from "../../../middleware";
import { PrismaSingleton } from "../../../clients/db";
import { z } from "zod";
const prismaClient = PrismaSingleton.getInstance().prisma;

export async function fetchState(req: NextFncReq, res: Response) {
  try {
    const states = await prismaClient.state.findMany({
      include: {
        citys: true,
      },
      orderBy: { createdAt: "asc" },
    });
    return res.json({
      success: true,
      message: "fetched city successfuly",
      states,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
