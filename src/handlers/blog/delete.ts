import { Response } from "express";
import { NextFncReq } from "../../middleware";
import { PrismaSingleton } from "../../clients/db";
import { z } from "zod";

export const deleteBlogInput = z.object({
  id: z.string(),
});

const prismaClient = PrismaSingleton.getInstance().prisma;

export async function deleteBlog(req: NextFncReq, res: Response) {
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

    const blogInDb = await prismaClient.blog.findUnique({ where: { id } });

    if (!blogInDb) {
      return res.status(401).json({
        success: false,
        message: "no blog found with that id",
      });
    }
    const blog = await prismaClient.blog.delete({
      where: { id: blogInDb.id },
    });

    return res.status(200).json({
      success: true,
      message: "blog deleted successfully",
      blog,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
