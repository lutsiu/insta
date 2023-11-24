import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import fs from "fs/promises";
import morgan from "morgan";
import * as socket from "socket.io";
import path from "path";
import authRouter from './routes/authentification.ts';
/* CONFIG */

dotenv.config();

const app = express();
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors({ credentials: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use("/public", express.static(path.join(process.cwd(), "public")));

/* ROUTES */
app.use("/auth", authRouter);
/* MONGO */

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL as string;
mongoose.connect(MONGO_URL).then(() => {
  const server = app.listen(PORT);

});
