import { Router } from "express";
import { authenticateAdmin, authenticateSubAdmin } from "../middleware";
import {
  fetchCategory,
  fetchCategoryByTitle,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../handlers";

export const categoryRouter = Router();

categoryRouter.get("/", fetchCategory);
categoryRouter.get("/popular", fetchCategory);

categoryRouter.post("/title", fetchCategoryByTitle);

categoryRouter.post("/sub-admin/create", authenticateSubAdmin, createCategory);

categoryRouter.put("/sub-admin/update", authenticateSubAdmin, updateCategory);

categoryRouter.delete(
  "/sub-admin/delete",
  authenticateSubAdmin,
  deleteCategory
);

categoryRouter.post("/admin/create", authenticateAdmin, createCategory);

categoryRouter.put("/admin/update", authenticateAdmin, updateCategory);

categoryRouter.delete("/admin/delete", authenticateAdmin, deleteCategory);
