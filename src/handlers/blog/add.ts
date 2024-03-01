import { Response } from "express";
import { NextFncReq } from "../../middleware";
import { PrismaSingleton } from "../../clients/db";
import { z } from "zod";
const prismaClient = PrismaSingleton.getInstance().prisma;

export const blogInput = z.object({
  id: z.string().optional(),
  title1: z.string(),
  title2: z.string().optional(),
  title3: z.string().optional(),
  title4: z.string().optional(),
  description1: z.string(),
  description2: z.string(),
  description3: z.string(),
  description4: z.string(),
  imageUrl: z.string().optional(),
  links: z.string().optional(),
  linksUrl: z.string().optional(),
});

export async function addBlog(req: NextFncReq, res: Response) {
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

    const blog = await prismaClient.blog.create({
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
      message: "blog created successfully",
      blog,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
