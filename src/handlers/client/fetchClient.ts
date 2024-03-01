import { Response } from "express";
import { NextFncReq } from "../../middleware";

export async function fetchClient(req: NextFncReq, res: Response) {
  try {
    const client = req.client;
    client!.password = "";

    return res.status(200).json({
      success: true,
      client,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
