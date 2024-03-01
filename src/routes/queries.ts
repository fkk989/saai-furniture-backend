import { Router } from "express";
import { authenticateClient } from "../middleware";
import { addQuery, deleteQuery } from "../handlers";
import { fetchQueries } from "../handlers/queries/fetch";

export const queriesRouter = Router();

queriesRouter.get("/", fetchQueries);

queriesRouter.get("/id", fetchQueries);

queriesRouter.post("/add", addQuery);

queriesRouter.post("/delete", authenticateClient, deleteQuery);
