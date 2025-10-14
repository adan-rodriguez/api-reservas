import { body, matchedData, validationResult } from "express-validator";

export class HallValidator {
  static titulo = body("titulo")
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage("El título debe tener entre 1 y 255 caracteres");

  static direccion = body("direccion")
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage("La dirección debe tener entre 1 y 255 caracteres");

  static importe = body("importe")
    .isFloat({ min: 0 })
    .withMessage("El importe debe ser positivo o cero");

  static capacidad = body("capacidad")
    .optional({ nullable: true })
    .isInt({ min: 1 })
    .withMessage("La capacidad debe ser un número entero positivo");

  static latitud = body("latitud")
    .optional({ nullable: true })
    .isFloat({ min: -90, max: 90 })
    .withMessage("La latitud debe estar entre -90 y 90");

  static longitud = body("longitud")
    .optional({ nullable: true })
    .isFloat({ min: -180, max: 180 })
    .withMessage("La longitud debe estar entre -180 y 180");

  static validate(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: { message: errors.array() },
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
