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
  deleteSubClient,
} from "../handlers";

export const clientRouter = Router();

clientRouter.get("/", authenticateClient, fetchClient);
clientRouter.get("/default", defaultClient);
clientRouter.post("/login", loginClient);
clientRouter.post("/signup", authenticateClient, signupClient);
clientRouter.put("/update", authenticateClient, updateClient);

clientRouter.post("/add-sub-client", authenticateClient, createSubClient);
clientRouter.get("/all-sub-client", authenticateClient, fetchAllSubClient);
clientRouter.delete("/delete-sub-client", authenticateClient, deleteSubClient);
