import { HallsModel } from "../models/halls.js";

export class HallsController {
  static getAll = async (req, res) => {
    try {
      const halls = await HallsModel.getAll();
      res.json({ success: true, data: halls });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { message: "Error interno del servidor." },
      });
    }
  };

  static getById = async (req, res) => {
    const { id } = req.params;
    try {
      const hall = await HallsModel.getById({ id });

      if (!hall) {
        return res.status(404).json({
          success: false,
          error: { message: "Salón no encontrado." },
        });
      }

      res.json({ success: true, data: hall });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { message: "Error interno del servidor." },
      });
    }
  };

  static create = async (req, res) => {
    const { titulo, direccion, importe } = req.body; // POR AHORA SOLO ESTOS TRES PORQUE SON LOS REQUERIDOS. DESPUES VEMOS LOS DEMÁS
    if (!titulo || !direccion || !importe) {
      return res.status(400).json({
        succes: false,
        error: { mensaje: "Faltan campos requeridos." },
      });
    }

    try {
      const newHall = await HallsModel.create({ titulo, direccion, importe });
      res.status(201).json({ success: true, data: newHall });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { message: "Error interno del servidor." },
      });
    }
  };

  static update = async (req, res) => {
    const { titulo } = req.body; // POR AHORA SOLO EL TÍTULO. DESPUES VEMOS LOS DEMÁS

    if (!titulo) {
      return res.status(400).json({
        succes: false,
        error: { mensaje: "Faltan campos requeridos." },
      });
    }

    const { id } = req.params;
    try {
      const updatedHall = await HallsModel.update({ id, input: { titulo } });
      res.json({ success: true, data: updatedHall });
    } catch (error) {
      if (error.message === "Salón no encontrado.") {
        return res.status(404).json({
          success: false,
          error: { message: error.message },
        });
      }

      res.status(500).json({
        success: false,
        error: { message: "Error interno del servidor." },
      });
    }
  };

  static delete = async (req, res) => {
    const { id } = req.params;
    try {
      await HallsModel.delete({ id });
      res.json({ success: true, message: "Salón eliminado exitosamente." });
    } catch (error) {
      if (error.message === "Salón no encontrado.") {
        return res.status(404).json({
          success: false,
          error: { message: error.message },
        });
      }

      res.status(500).json({
        success: false,
        error: { message: "Error interno del servidor." },
      });
    }
  };
}
