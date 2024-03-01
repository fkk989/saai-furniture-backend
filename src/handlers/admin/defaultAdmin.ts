import { Response, Request } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import { PrismaSingleton } from "../../clients/db";
import { signAsync } from "../../helpers";

const prismaClient = PrismaSingleton.getInstance().prisma;

// env var's
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const secret = process.env.JWT_SECRET;

const DEFAULT_ADMIN_EMAIL = process.env.DEFAULT_ADMIN_EMAIL;
const DEFAULT_ADMIN_PASSWORD = process.env.DEFAULT_ADMIN_PASSWORD;
const DEFAULT_ADMIN_NAME = process.env.DEFAULT_ADMIN_NAME;

export async function defaultAdmin(req: Request, res: Response) {
  try {
    // hashing password
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, salt);

    const adminInDb = await prismaClient.admin.findUnique({
      where: { email: DEFAULT_ADMIN_EMAIL },
    });

    if (adminInDb) {
      return res.status(200).json({
        success: false,
        message: "default Admin already present",
      });
    }

    const admin = await prismaClient.admin.create({
      data: {
        name: DEFAULT_ADMIN_NAME,
        email: DEFAULT_ADMIN_EMAIL,
        password: hashedPassword,
      },
    });

    // deleting admin password before sending as a response
    admin.password = "";
    return res.status(200).json({
      success: true,
      message: "default admin created successfully",
      admin,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
