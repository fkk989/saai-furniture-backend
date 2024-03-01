import { Router } from "express";
import { authenticateAdmin, authenticateSubAdmin } from "../middleware";
import {
  fetchDesign,
  fetchDesignByTitle,
  createDesign,
  updateDesign,
  deleteDesign,
} from "../handlers";

export const designRouter = Router();

designRouter.get("/", fetchDesign);

designRouter.post("/id", fetchDesignByTitle);

// admin

designRouter.post("/admin/create", authenticateAdmin, createDesign);

designRouter.put("/admin/update", authenticateAdmin, updateDesign);

designRouter.delete("/admin/delete", authenticateAdmin, deleteDesign);

// sub admin

designRouter.post("/sub-admin/create", authenticateSubAdmin, createDesign);

designRouter.put("/sub-admin/update", authenticateSubAdmin, updateDesign);

designRouter.delete("/sub-admin/delete", authenticateSubAdmin, deleteDesign);
