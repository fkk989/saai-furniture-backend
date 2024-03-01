import { Response } from "express";
import { NextFncReq } from "../../middleware";
import { PrismaSingleton } from "../../clients/db";
const prismaClient = PrismaSingleton.getInstance().prisma;

export async function fetchBlogs(req: NextFncReq, res: Response) {
  try {
    const blogs = await prismaClient.blog.findMany({
      orderBy: { createdAt: "asc" },
    });
    return res.json({
      success: true,
      message: "fetched blogs successfuly",
      blogs,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
