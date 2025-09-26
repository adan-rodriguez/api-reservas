import { Router } from "express";
import { HallsController } from "../../controllers/halls.js";

export const hallsRouter = Router();

hallsRouter.get("/", HallsController.getAll);

hallsRouter.get("/:id", HallsController.getById);

hallsRouter.post("/", HallsController.create);

hallsRouter.patch("/:id", HallsController.update);

hallsRouter.delete("/:id", HallsController.delete);
