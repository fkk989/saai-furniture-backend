import { Response } from "express";
import { NextFncReq } from "../../middleware";

export async function fetchsubClient(req: NextFncReq, res: Response) {
  try {
    const subClient = req.subClient;
    subClient!.password = "";

    return res.status(200).json({
      success: true,
      client: subClient,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
