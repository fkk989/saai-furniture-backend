import { Response } from "express";
import { NextFncReq } from "../../middleware";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

const AWS_S3_ACCESS_KEY = process.env.AWS_S3_ACCESS_KEY as string;
const AWS_S3_SECRET_KEY = process.env.AWS_S3_SECRET_KEY as string;

const s3Client = new S3Client({
  credentials: {
    accessKeyId: AWS_S3_ACCESS_KEY,
    secretAccessKey: AWS_S3_SECRET_KEY,
  },
  region: "ap-south-1",
});

const input = z.object({
  imageType: z.string(),
});

export async function get_signed_url(req: NextFncReq, res: Response) {
  try {
    const reqBody = req.body;

    const parsedInput = input.safeParse(reqBody);

    if (!parsedInput.success) {
      return res
        .json({
          success: false,
          message: "Invalid input",
        })
        .status(401);
    }

    //getting imageType from parsedInput
    const { imageType } = parsedInput.data;
    const uuid = uuidv4();
    const putObjectCommand = new PutObjectCommand({
      Bucket: "faisal-saai-furniture",
      Key: `uploads/${uuid}.${imageType}`,
    });

    const signedUrl = await getSignedUrl(s3Client, putObjectCommand);

    return res.json({
      success: true,
      message: "got the signed url",
      url: signedUrl,
    });
  } catch (e: any) {
    return res
      .json({
        success: false,
        message: e.message,
      })
      .status(401);
  }
}
