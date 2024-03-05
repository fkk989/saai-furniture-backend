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
const DEFAULT_CATEGORY_LIMIT = process.env.DEFAULT_CATEGORY_LIMIT;
const DEFAULT_DESIGN_LIMIT = process.env.DEFAULT_DESIGN_LIMIT;

export async function defaultClient(req: Request, res: Response) {
  try {
    const categoryLimit = parseInt(DEFAULT_CATEGORY_LIMIT);
    const designLimit = parseInt(DEFAULT_DESIGN_LIMIT);
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
        categoryLimit,
        designLimit,
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
