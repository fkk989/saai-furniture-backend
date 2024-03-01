import { Response } from "express";
import { NextFncReq } from "../../../middleware";
import { PrismaSingleton } from "../../../clients/db";
import { z } from "zod";
const prismaClient = PrismaSingleton.getInstance().prisma;

export const stateInput = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});

export async function addState(req: NextFncReq, res: Response) {
  try {
    const reqBody = req.body;

    const parsedInput = stateInput.safeParse(reqBody);

    if (!parsedInput.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid Input",
      });
    }

    const { name } = parsedInput.data;

    const state = await prismaClient.state.create({
      data: {
        name: name!,
      },
    });

    return res.status(200).json({
      success: true,
      message: "state created successfully",
      state,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
