import { Response } from "express";
import { NextFncReq } from "../../middleware";
import { PrismaSingleton } from "../../clients/db";
import { z } from "zod";

const prismaClient = PrismaSingleton.getInstance().prisma;

export const subClientDeleteAdmin = z.object({
  id: z.string(),
});
export async function deleteSubClient(req: NextFncReq, res: Response) {
  try {
    const reqBody = req.body;

    const parsedInput = subClientDeleteAdmin.safeParse(reqBody);

    if (!parsedInput.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid Input",
      });
    }

    const { id } = parsedInput.data;

    const deletedDesign = await prismaClient.subClient.delete({
      where: { id },
    });
    return res.status(200).json({
      message: "sub client deleted successfully",
      success: true,
      design: deletedDesign,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
