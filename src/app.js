import express from "express";
import { router } from "./routes/index.js";

export const app = express();
app.disable("x-powered-by");
app.use(express.json());

app.use("/api", router);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: { message: "NOT FOUND" },
  });
});
