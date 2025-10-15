import { Router } from "express";
import apicache from "apicache";

import { check } from "express-validator";
import { validarCampos } from "../../middlewares/validarcampos.js";

import { HallsController } from "../../controllers/halls.js";

const cache = apicache.middleware;
export const hallsRouter = Router();

hallsRouter.get("/", cache("5 minutes"), HallsController.getAll);

hallsRouter.get("/:id", HallsController.getById);

hallsRouter.put("/:id", HallsController.update);

hallsRouter.post(
  "/",
  [
    check("titulo", "El título es requerido.").trim().notEmpty(),
    check("direccion", "La dirección es requerida.").trim().notEmpty(),
    check("importe", "El importe es requerido y numérico.")
      .notEmpty()
      .isFloat({ gt: 0 }),
   
    validarCampos,
  ],
  async (req, res, next) => {
    
    try {
      const response = await HallsController.create(req, res);
      apicache.clear(); 
      return response;
    } catch (e) {
      next(e);
    }
  }
);


hallsRouter.patch(
    "/:id",
    [
        check("titulo", "El título no puede estar vacío.")
      .optional()
      .trim()
      .notEmpty(),
    check("importe", "El importe debe ser numérico.")
      .optional()
      .isFloat({ gt: 0 }),
    validarCampos,
  ],
  async (req, res, next) => {
    try {
      const response = await HallsController.update(req, res);
      apicache.clear();
      return response;
    } catch (e) {
      next(e);
    }
  }
);

hallsRouter.delete("/:id", async (req, res, next) => {
  try {
    const response = await HallsController.delete(req, res);
    apicache.clear();
    return response;
  } catch (e) {
    next(e);
  }
});
