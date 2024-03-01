import { Response } from "express";
import { NextFncReq } from "../../middleware";
import { PrismaSingleton } from "../../clients/db";

const prismaClient = PrismaSingleton.getInstance().prisma;

export async function fetchQueries(req: NextFncReq, res: Response) {
  try {
    const queries = await prismaClient.query.findMany({
      orderBy: { createdAt: "asc" },
    });
    return res.json({
      success: true,
      message: "fetched queries successfuly",
      queries,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
