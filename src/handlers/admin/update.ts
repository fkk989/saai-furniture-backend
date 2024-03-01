import { Admin } from "@prisma/client";
import { Response } from "express";
import { NextFncReq } from "../../middleware";
import { PrismaSingleton } from "../../clients/db";
import { z } from "zod";
const prismaClient = PrismaSingleton.getInstance().prisma;

const updateAdminInput = z.object({
  name: z.string().max(30),
});

export async function updateAdmin(req: NextFncReq, res: Response) {
  try {
    const { admin, body } = req as {
      admin: Admin;
      body: {
        name: string;
      };
    };

    const parsedInput = updateAdminInput.safeParse(body);

    if (!parsedInput.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid Input",
      });
    }

    const { name } = parsedInput.data;

    const updatedAdmin = await prismaClient.admin.update({
      where: { email: admin.email },
      data: {
        name,
      },
    });

    updatedAdmin.password = "";

    return res.status(200).json({
      success: true,
      message: "updated profile",
      admin: updatedAdmin,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
