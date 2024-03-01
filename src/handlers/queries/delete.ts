import { Response } from "express";
import { NextFncReq } from "../../middleware";
import { PrismaSingleton } from "../../clients/db";
import { queryInput } from "./add";

const prismaClient = PrismaSingleton.getInstance().prisma;

export async function deleteQuery(req: NextFncReq, res: Response) {
  try {
    const reqBody = req.body;

    const parsedInput = queryInput.safeParse(reqBody);

    if (!parsedInput.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid Input",
      });
    }

    const { id } = parsedInput.data;

    const qyeryInDb = await prismaClient.query.findUnique({ where: { id } });

    if (!qyeryInDb) {
      return res.status(401).json({
        success: false,
        message: "no query found with that id",
      });
    }

    const query = await prismaClient.query.delete({
      where: { id: qyeryInDb.id },
    });

    return res.status(200).json({
      success: true,
      message: "query deleted successfully",
      query,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
