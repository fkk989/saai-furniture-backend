import { SubClient } from "@prisma/client";
import { Response } from "express";
import { z } from "zod";
import emailValidator from "email-validator";
import bcrypt from "bcrypt";
import { PrismaSingleton } from "../../clients/db";
import { signAsync } from "../../helpers";

const prismaClient = PrismaSingleton.getInstance().prisma;

export const subClientInput = z.object({
  name: z.string().max(30).optional(),
  email: z.string().max(40),
  password: z.string().max(30),
  confirmPassword: z.string().max(30),
});

// env var's
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const secret = process.env.JWT_SECRET;

export async function createSubClient(
  req: {
    body: Partial<SubClient>;
  },
  res: Response
) {
  try {
    const reqBody = req.body;
    const parsedInput = subClientInput.safeParse(reqBody);

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

    const clientInDb = await prismaClient.subClient.findUnique({
      where: { email },
    });

    if (clientInDb) {
      return res.status(401).json({
        success: false,
        message: "user already exists",
      });
    }

    const validEmail = await emailValidator.validate(email);

    if (!validEmail) {
      return res.status(401).json({
        success: false,
        message: "Invalid email",
      });
    }

    // hashing password
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);

    const subClient = await prismaClient.subClient.create({
      data: {
        name: name!,
        email,
        password: hashedPassword,
      },
    });

    const signedToken = await signAsync({ email: subClient.email, secret });

    // deleting user password before sending as a response
    subClient.password = "";
    return res.status(200).json({
      success: true,
      message: "sub client created successfully",
      client: subClient,
      token: signedToken,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
