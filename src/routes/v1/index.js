import { Router } from "express";
import { hallsRouter } from "./halls.js";

export const v1Router = Router();

v1Router.use("/salones", hallsRouter);
