import { Request, Response } from "express";
import { PrismaSingleton } from "../../clients/db";
import { signAsync, verifyPassword } from "../../helpers";
import { z } from "zod";
const prismaClient = PrismaSingleton.getInstance().prisma;

const userLoginInput = z.object({
  email: z.string().max(40),
  password: z.string().max(30),
});

// env var's
const secret = process.env.JWT_SECRET;

export async function loginSubClient(req: Request, res: Response) {
  try {
    const reqBody = req.body;

    const parsedInput = await userLoginInput.safeParse(reqBody);
    if (!parsedInput.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid Input",
      });
    }

    const { email, password } = parsedInput.data;

    const subClientInDb = await prismaClient.subClient.findUnique({
      where: { email },
    });

    if (!subClientInDb) {
      return res.status(401).json({
        success: false,
        message: "no user found with that email",
      });
    }

    const validPassword = await verifyPassword(
      password,
      subClientInDb.password
    );

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "incorrect password",
      });
    }

    const signedToken = await signAsync({ email: subClientInDb.email, secret });
    // deleting user password before sending as a response
    subClientInDb.password = "";
    return res.status(200).json({
      success: true,
      message: "login successfull",
      client: subClientInDb,
      token: signedToken,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
