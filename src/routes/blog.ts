import { Router } from "express";
import { authenticateClient, authenticateSubClient } from "../middleware";
import {
  addBlog,
  deleteBlog,
  fetchBlogById,
  fetchBlogs,
  updateBlog,
} from "../handlers";

export const blogRouter = Router();

blogRouter.get("/", fetchBlogs);

// client
blogRouter.post("/client/add", authenticateClient, addBlog);
blogRouter.post("/client/id", authenticateClient, fetchBlogById);
blogRouter.delete("/client/delete", authenticateClient, deleteBlog);
blogRouter.put("/client/update", authenticateClient, updateBlog);

// sub client
blogRouter.post("/sub-client/add", authenticateSubClient, addBlog);
blogRouter.post("/sub-client/id", authenticateSubClient, fetchBlogById);
blogRouter.delete("/sub-client/delete", authenticateSubClient, deleteBlog);
blogRouter.put("/sub-client/update", authenticateSubClient, updateBlog);
