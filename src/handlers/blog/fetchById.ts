import { Response } from "express";
import { NextFncReq } from "../../middleware";
import { PrismaSingleton } from "../../clients/db";
import { deleteBlogInput } from "./delete";

const prismaClient = PrismaSingleton.getInstance().prisma;

export async function fetchBlogById(req: NextFncReq, res: Response) {
  try {
    const reqBody = req.body;

    const parsedInput = deleteBlogInput.safeParse(reqBody);

    if (!parsedInput.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid Input",
      });
    }

    const { id } = parsedInput.data;

    const blog = await prismaClient.blog.findUnique({
      where: { id },
    });

    return res.json({
      success: true,
      message: "fetched blog successfuly",
      blog,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
