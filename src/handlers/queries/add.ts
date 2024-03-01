import { Response } from "express";
import { NextFncReq } from "../../middleware";
import { PrismaSingleton } from "../../clients/db";
import { z } from "zod";

const prismaClient = PrismaSingleton.getInstance().prisma;

export const queryInput = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  message: z.string(),
  location: z.string().optional(),
});

export async function addQuery(req: NextFncReq, res: Response) {
  try {
    const reqBody = req.body;

    const parsedInput = queryInput.safeParse(reqBody);

    if (!parsedInput.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid Input",
      });
    }

    const { name, email, phone, message, location } = parsedInput.data;

    const query = await prismaClient.query.create({
      data: {
        name,
        email,
        phone,
        message,
        location,
      },
    });

    return res.status(200).json({
      success: true,
      message: "qery added successfully",
      query,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
