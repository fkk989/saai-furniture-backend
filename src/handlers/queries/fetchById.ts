import { Response } from "express";
import { NextFncReq } from "../../middleware";
import { PrismaSingleton } from "../../clients/db";
import { queryInput } from "./add";

const prismaClient = PrismaSingleton.getInstance().prisma;

export async function fetchBlogById(req: NextFncReq, res: Response) {
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

    const query = await prismaClient.query.findUnique({
      where: { id },
    });

    return res.json({
      success: true,
      message: "fetched query successfuly",
      query,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
