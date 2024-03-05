import { Router } from "express";
import {
  authenticateAdmin,
  authenticateClient,
  authenticateSubAdmin,
  authenticateSubClient,
} from "../middleware";
import {
  fetchAllCategory,
  fetchSofaCategory,
  fetchPopularCategory,
  fetchCategoryByTitle,
  createCategory,
  updateCategory,
  deleteCategory,
  fetchDiningCategory,
  createCategoryClient,
} from "../handlers";

export const categoryRouter = Router();

categoryRouter.get("/", fetchSofaCategory);
categoryRouter.get("/dining", fetchDiningCategory);

categoryRouter.get("/all", fetchAllCategory);
categoryRouter.get("/popular", fetchPopularCategory);

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

//

categoryRouter.post("/client/create", authenticateClient, createCategoryClient);

categoryRouter.put("/client/update", authenticateClient, updateCategory);

categoryRouter.delete("/client/delete", authenticateClient, deleteCategory);

categoryRouter.post(
  "/sub-client/create",
  authenticateSubClient,
  createCategoryClient
);

categoryRouter.put("/sub-client/update", authenticateSubClient, updateCategory);

categoryRouter.delete(
  "/sub-client/delete",
  authenticateSubClient,
  deleteCategory
);
