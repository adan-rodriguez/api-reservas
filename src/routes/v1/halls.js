import { Router } from "express";
import { HallsController } from "../../controllers/halls.js";
import apicache from "apicache";
import { HallValidator } from "../../middlewares/validators/halls.js";

export const hallsRouter = Router();
const cache = apicache.middleware;

hallsRouter.get("/", cache("5 minutes"), HallsController.getAll);

hallsRouter.get("/:id", HallsController.getById);

hallsRouter.post("/", HallValidator.create(), HallsController.create);

hallsRouter.patch("/:id", HallValidator.update(), HallsController.update);

hallsRouter.delete("/:id", HallsController.delete);
