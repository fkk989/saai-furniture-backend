import { Request, Response } from "express";
import { PrismaSingleton } from "../../clients/db";
import { signAsync, verifyPassword } from "../../helpers";
import { z } from "zod";
const prismaClient = PrismaSingleton.getInstance().prisma;

const clientLoginInput = z.object({
  email: z.string().max(40),
  password: z.string().max(30),
});

// env var's
const secret = process.env.JWT_SECRET;

export async function loginClient(req: Request, res: Response) {
  try {
    const reqBody = req.body;

    const parsedInput = await clientLoginInput.safeParse(reqBody);
    if (!parsedInput.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid Input",
      });
    }

    const { email, password } = parsedInput.data;

    const client = await prismaClient.client.findUnique({
      where: { email },
    });

    if (!client) {
      return res.status(401).json({
        success: false,
        message: "no user found with that email",
      });
    }

    const validPassword = await verifyPassword(password, client.password);

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "incorrect password",
      });
    }

    const signedToken = await signAsync({ email: client.email, secret });
    // deleting user password before sending as a response
    client.password = "";
    return res.status(200).json({
      success: true,
      message: "login successfull",
      client,
      token: signedToken,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
