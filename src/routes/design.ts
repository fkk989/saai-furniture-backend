import { Router } from "express";
import {
  authenticateAdmin,
  authenticateClient,
  authenticateSubAdmin,
  authenticateSubClient,
} from "../middleware";
import {
  fetchDesign,
  fetchDesignByTitle,
  createDesign,
  updateDesign,
  deleteDesign,
  fetchDiningDesign,
  createDesignClient,
} from "../handlers";

export const designRouter = Router();

designRouter.post("/", fetchDesign);
designRouter.post("/dining", fetchDiningDesign);

designRouter.post("/id", fetchDesignByTitle);

// admin

designRouter.post("/admin/create", authenticateAdmin, createDesign);

designRouter.put("/admin/update", authenticateAdmin, updateDesign);

designRouter.delete("/admin/delete", authenticateAdmin, deleteDesign);

// sub admin

designRouter.post("/sub-admin/create", authenticateSubAdmin, createDesign);

designRouter.put("/sub-admin/update", authenticateSubAdmin, updateDesign);

designRouter.delete("/sub-admin/delete", authenticateSubAdmin, deleteDesign);

// client
designRouter.post("/client/create", authenticateClient, createDesignClient);

designRouter.put("/client/update", authenticateClient, updateDesign);

designRouter.delete("/client/delete", authenticateClient, deleteDesign);

// sub client

designRouter.post(
  "/sub-client/create",
  authenticateSubClient,
  createDesignClient
);

designRouter.put("/sub-client/update", authenticateSubClient, updateDesign);

designRouter.delete("/sub-client/delete", authenticateSubClient, deleteDesign);
