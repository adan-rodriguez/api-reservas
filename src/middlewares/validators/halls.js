import { body, matchedData, validationResult } from "express-validator";

export class HallValidator {
  static titulo = body("titulo")
    .trim()
    .isLength({ max: 255 })
    .withMessage("El título no puede superar los 255 caracteres");

  static direccion = body("direccion")
    .trim()
    .isLength({ max: 255 })
    .withMessage("La dirección no puede superar los 255 caracteres");

  static importe = body("importe")
    .isFloat({ min: 0 })
    .withMessage("El importe debe ser positivo o cero");

  static capacidad = body("capacidad")
    .optional()
    .isInt({ min: 1 })
    .withMessage("La capacidad debe ser un número entero positivo");

  static latitud = body("latitud")
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage("La latitud debe estar entre -90 y 90");

  static longitud = body("longitud")
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage("La longitud debe estar entre -180 y 180");

  static validate(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          message: "Error de validación",
          details: errors.array().map((err) => ({
            field: err.path,
            message: err.msg,
          })),
        },
      });
    }

    req.body = matchedData(req);
    next();
  }

  static create() {
    return [
      this.titulo.notEmpty().withMessage("El título es obligatorio"),
      this.direccion.notEmpty().withMessage("La dirección es obligatoria"),
      this.importe.notEmpty().withMessage("El importe es obligatorio"),
      this.capacidad,
      this.latitud,
      this.longitud,
      this.validate,
    ];
  }

  static update() {
    return [
      this.titulo.optional(),
      this.direccion.optional(),
      this.importe.optional(),
      this.capacidad,
      this.latitud,
      this.longitud,
      this.validate,
    ];
  }
}
