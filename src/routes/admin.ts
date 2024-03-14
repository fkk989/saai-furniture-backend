import { Router } from "express";
import { authenticateAdmin } from "../middleware";
import {
  loginAdmin,
  signupAdmin,
  fetchAdmin,
  updateAdmin,
  defaultAdmin,
  createSubAdmin,
  fetchAllSubAdmin,
  updateClientLimit,
} from "../handlers";

export const adminRouter = Router();

adminRouter.get("/", authenticateAdmin, fetchAdmin);
adminRouter.get("/default", defaultAdmin);

adminRouter.post("/login", loginAdmin);

adminRouter.post("/signup", authenticateAdmin, signupAdmin);
adminRouter.post("/add-sub-admin", authenticateAdmin, createSubAdmin);

adminRouter.put("/update", authenticateAdmin, updateAdmin);

adminRouter.get("/all-sub-admin", authenticateAdmin, fetchAllSubAdmin);

adminRouter.post("/update-limit", authenticateAdmin, updateClientLimit);
