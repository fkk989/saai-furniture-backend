import { Router } from "express";
import {
  authenticateAdmin,
  authenticateClient,
  authenticateSubAdmin,
  authenticateSubClient,
} from "../middleware";
import { get_signed_url } from "../handlers";

export const signedRouter = Router();

signedRouter.post("/admin", authenticateAdmin, get_signed_url);
signedRouter.post("/sub-admin", authenticateSubAdmin, get_signed_url);
signedRouter.post("/client", authenticateClient, get_signed_url);
signedRouter.post("/sub-client", authenticateSubClient, get_signed_url);
