import { Router } from "express";
import { addUser } from "../handlers";

export const userRouter = Router();

userRouter.post("/add", addUser);
