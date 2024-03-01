import { Router } from "express";
import { authenticateSubAdmin, authenticateAdmin } from "../middleware";
import {
  updateAdmin,
  fetchSubAdmin,
  loginSubAdmin,
  createSubAdmin,
  updateSubAdmin,
} from "../handlers";

export const subAdminRouter = Router();

subAdminRouter.get("/", authenticateSubAdmin, fetchSubAdmin);

subAdminRouter.post("/login", loginSubAdmin);

subAdminRouter.put("/update", authenticateSubAdmin, updateSubAdmin);
