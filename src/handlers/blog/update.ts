import { Response } from "express";
import { NextFncReq } from "../../middleware";
import { PrismaSingleton } from "../../clients/db";
import { blogInput } from "./add";

const prismaClient = PrismaSingleton.getInstance().prisma;

export async function updateBlog(req: NextFncReq, res: Response) {
  try {
    const reqBody = req.body;

    const parsedInput = blogInput.safeParse(reqBody);

    if (!parsedInput.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid Input",
      });
    }

    const {
      id,
      title1,
      title2,
      title3,
      title4,
      description1,
      description2,
      description3,
      description4,
      imageUrl,
      links,
      linksUrl,
    } = parsedInput.data;

    const blogInDb = await prismaClient.blog.findUnique({ where: { id } });

    if (!blogInDb) {
      return res.status(401).json({
        success: false,
        message: "no blog found with that id",
      });
    }
    const blog = await prismaClient.blog.update({
      where: { id },
      data: {
        title1,
        title2,
        title3,
        title4,
        description1,
        description2,
        description3,
        description4,
        imageUrl: imageUrl!,
        links: links!,
        linksUrl: linksUrl!,
      },
    });

    return res.status(200).json({
      success: true,
      message: "blog updated successfully",
      blog,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
