import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import {
  categoryRouter,
  clientRouter,
  queriesRouter,
  adminRouter,
  designRouter,
  marketAreaRouter,
  blogRouter,
  userRouter,
  subClientRouter,
  subAdminRouter,
} from "../routes";
import { signedRouter } from "../routes/signedUrl";

dotenv.config();

const app = express();

app.use(cors(), bodyParser.json(), cookieParser());

app.use("/client", clientRouter);
app.use("/sub-client", subClientRouter);
app.use("/admin", adminRouter);
app.use("/sub-admin", subAdminRouter);
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/design", designRouter);
app.use("/market-area", marketAreaRouter);
app.use("/blog", blogRouter);
app.use("/query", queriesRouter);
app.use("/get-signed-url", signedRouter);
// healthCheck
app.get("/health", (req, res) => {
  return res
    .json({
      message: "server running fine",
    })
    .status(200);
});
export default app;
