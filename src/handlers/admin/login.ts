import { Request, Response } from "express";
import { PrismaSingleton } from "../../clients/db";
import { signAsync, verifyPassword } from "../../helpers";
import { z } from "zod";
const prismaClient = PrismaSingleton.getInstance().prisma;

const adminLoginInput = z.object({
  email: z.string().max(40),
  password: z.string().max(30),
});

// env var's
const secret = process.env.JWT_SECRET;

export async function loginAdmin(req: Request, res: Response) {
  try {
    const reqBody = req.body;

    const parsedInput = await adminLoginInput.safeParse(reqBody);
    if (!parsedInput.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid Input",
      });
    }

    const { email, password } = parsedInput.data;

    const admin = await prismaClient.admin.findUnique({ where: { email } });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email",
      });
    }

    const validPassword = await verifyPassword(password, admin.password);

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "incorrect password",
      });
    }

    const signedToken = await signAsync({ email: admin.email, secret });

    res.cookie("saai-admin-token", signedToken, {
      httpOnly: true,
      sameSite: "none",
    });
    // deleting user password before sending as a response
    admin.password = "";
    return res.status(200).json({
      success: true,
      message: "login successfull",
      admin,
      token: signedToken,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
