import { Admin } from "@prisma/client";
import { Response } from "express";
import { z } from "zod";
import emailValidator from "email-validator";
import bcrypt from "bcrypt";
import { PrismaSingleton } from "../../clients/db";
import { signAsync } from "../../helpers";

const prismaClient = PrismaSingleton.getInstance().prisma;

export const adminInput = z.object({
  name: z.string().max(30),
  email: z.string().max(40),
  password: z.string().max(30),
  confirmPassword: z.string().max(30),
});

// env var's
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const secret = process.env.JWT_SECRET;

export async function signupAdmin(
  req: {
    body: Partial<Admin>;
  },
  res: Response
) {
  try {
    const reqBody = req.body;
    const parsedInput = adminInput.safeParse(reqBody);

    if (!parsedInput.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid Input",
      });
    }

    const { name, email, password, confirmPassword } = parsedInput.data;

    if (password !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "password and confirm password does not match",
      });
    }

    const adminInDb = await prismaClient.admin.findUnique({ where: { email } });
    if (adminInDb) {
      return res.status(401).json({
        success: false,
        message: "Admin already present",
      });
    }

    const validEmail = await emailValidator.validate(email!);

    if (!validEmail) {
      return res.status(401).json({
        success: false,
        message: "Invalid email syntax",
      });
    }

    // hashing password
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await prismaClient.admin.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    const signedToken = await signAsync({ email: admin.email, secret });

    res.cookie("saai-admin-token", signedToken, {
      httpOnly: true,
      sameSite: "none",
    });

    // deleting admin password before sending as a response
    admin.password = "";
    return res.status(200).json({
      success: true,
      message: "Admin created successfully",
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
