import { Router } from "express";
import { authenticateSubAdmin, authenticateAdmin } from "../middleware";
import {
  deleteSubAdmin,
  fetchSubAdmin,
  loginSubAdmin,
  updateSubAdmin,
} from "../handlers";

export const subAdminRouter = Router();

subAdminRouter.get("/", authenticateSubAdmin, fetchSubAdmin);

subAdminRouter.post("/login", loginSubAdmin);

subAdminRouter.put("/update", authenticateSubAdmin, updateSubAdmin);

subAdminRouter.delete("/delete", authenticateAdmin, deleteSubAdmin);
