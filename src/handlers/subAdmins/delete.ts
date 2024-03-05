import { Response } from "express";
import { NextFncReq } from "../../middleware";
import { PrismaSingleton } from "../../clients/db";
import { z } from "zod";

const prismaClient = PrismaSingleton.getInstance().prisma;

export const subAdminDeleteAdmin = z.object({
  id: z.string(),
});
export async function deleteSubAdmin(req: NextFncReq, res: Response) {
  try {
    const reqBody = req.body;

    const parsedInput = subAdminDeleteAdmin.safeParse(reqBody);

    if (!parsedInput.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid Input",
      });
    }

    const { id } = parsedInput.data;

    const deletedSubAdmin = await prismaClient.subAdmin.delete({
      where: { id },
    });
    return res.status(200).json({
      message: "sub admin deleted successfully",
      success: true,
      subAdmin: deletedSubAdmin,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
