import { Response, Request } from "express";
import bcrypt from "bcrypt";
import { PrismaSingleton } from "../../clients/db";

const prismaClient = PrismaSingleton.getInstance().prisma;

// env var's
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const secret = process.env.JWT_SECRET;
const DEFAULT_CLIENT_EMAIL = process.env.DEFAULT_CLIENT_EMAIL;
const DEFAULT_CLIENT_PASSWORD = process.env.DEFAULT_CLIENT_PASSWORD;
const DEFAULT_CLIENT_NAME = process.env.DEFAULT_CLIENT_NAME;

export async function defaultClient(req: Request, res: Response) {
  try {
    // hashing password
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(DEFAULT_CLIENT_PASSWORD, salt);

    const clientInDb = await prismaClient.client.findUnique({
      where: { email: DEFAULT_CLIENT_EMAIL },
    });

    if (clientInDb) {
      return res.status(200).json({
        success: false,
        message: "default client already present",
      });
    }

    const client = await prismaClient.client.create({
      data: {
        name: DEFAULT_CLIENT_NAME,
        email: DEFAULT_CLIENT_EMAIL,
        password: hashedPassword,
      },
    });

    // deleting user password before sending as a response
    client.password = "";
    return res.status(200).json({
      success: true,
      message: "client created successfully",
      client,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
