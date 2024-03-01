import { Response } from "express";
import { NextFncReq } from "../../../middleware";
import { PrismaSingleton } from "../../../clients/db";
import { stateInput } from "./add";
import { z } from "zod";
const prismaClient = PrismaSingleton.getInstance().prisma;

export async function deleteState(req: NextFncReq, res: Response) {
  try {
    const reqBody = req.body;

    const parsedInput = stateInput.safeParse(reqBody);

    if (!parsedInput.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid Input",
      });
    }

    const { id } = parsedInput.data;

    const stateInDb = await prismaClient.state.findUnique({ where: { id } });

    if (!stateInDb) {
      return res.status(401).json({
        success: false,
        message: "no state found with that id",
      });
    }
    const state = await prismaClient.state.delete({
      where: { id: stateInDb.id },
    });

    return res.status(200).json({
      success: true,
      message: "state deleted successfully",
      state,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
