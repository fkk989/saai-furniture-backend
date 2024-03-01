import { Response } from "express";
import { NextFncReq } from "../../middleware";
import { PrismaSingleton } from "../../clients/db";
import emailValidator from "email-validator";
import { z } from "zod";
const prismaClient = PrismaSingleton.getInstance().prisma;

export const userInput = z.object({
  name: z.string().max(40),
  email: z.string().max(40),
  phone: z.string().max(40),
});

export async function addUser(req: NextFncReq, res: Response) {
  try {
    const reqBody = req.body;

    const parsedInput = userInput.safeParse(reqBody);

    if (!parsedInput.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid Input",
      });
    }

    const { name, email, phone } = parsedInput.data;

    const validEmail = await emailValidator.validate(email!);

    if (!validEmail) {
      return res.status(401).json({
        success: false,
        message: "Invalid email syntax",
      });
    }

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        phone,
      },
    });

    return res.status(200).json({
      success: true,
      message: "user saved successfully",
      user,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
