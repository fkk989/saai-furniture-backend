import { Response } from "express";
import { NextFncReq } from "../../middleware";

export async function fetchAdmin(req: NextFncReq, res: Response) {
  try {
    const admin = req.admin;
    admin!.password = "";

    return res.status(200).json({
      success: true,
      admin,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
