import { Router } from "express";
import { authenticateClient } from "../middleware";
import {
  fetchClient,
  loginClient,
  signupClient,
  updateClient,
  defaultClient,
  createSubClient,
  fetchAllSubClient,
} from "../handlers";

export const clientRouter = Router();

clientRouter.get("/", authenticateClient, fetchClient);

clientRouter.get("/all-client", authenticateClient, fetchAllSubClient);

clientRouter.get("/default", defaultClient);

clientRouter.post("/login", loginClient);

clientRouter.post("/signup", authenticateClient, signupClient);

clientRouter.post("/add-sub-client", authenticateClient, createSubClient);

clientRouter.put("/update", authenticateClient, updateClient);
