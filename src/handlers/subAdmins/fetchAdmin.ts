import { Response } from "express";
import { NextFncReq } from "../../middleware";

export async function fetchSubAdmin(req: NextFncReq, res: Response) {
  try {
    const subAdmin = req.subAdmin;
    subAdmin!.password = "";

    return res.status(200).json({
      success: true,
      admin: subAdmin,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
