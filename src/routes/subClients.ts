import { Router } from "express";
import { authenticateSubClient } from "../middleware";
import { loginSubClient, fetchsubClient, updateSubClient } from "../handlers";

export const subClientRouter = Router();

subClientRouter.get("/", authenticateSubClient, fetchsubClient);

subClientRouter.post("/login", loginSubClient);

subClientRouter.put("/update", authenticateSubClient, updateSubClient);
