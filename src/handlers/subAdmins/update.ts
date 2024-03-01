import { Admin, SubAdmin } from "@prisma/client";
import { Response } from "express";
import { NextFncReq } from "../../middleware";
import { PrismaSingleton } from "../../clients/db";
import { z } from "zod";
const prismaClient = PrismaSingleton.getInstance().prisma;

const updateSubAdminInput = z.object({
  name: z.string().max(30),
});

export async function updateSubAdmin(req: NextFncReq, res: Response) {
  try {
    const { subAdmin, body } = req as {
      subAdmin: SubAdmin;
      body: {
        name: string;
      };
    };

    const parsedInput = updateSubAdminInput.safeParse(body);

    if (!parsedInput.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid Input",
      });
    }

    const { name } = parsedInput.data;

    const updatedSubAdmin = await prismaClient.subAdmin.update({
      where: { email: subAdmin.email },
      data: {
        name,
      },
    });

    updatedSubAdmin.password = "";

    return res.status(200).json({
      success: true,
      message: "updated profile",
      admin: updatedSubAdmin,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
