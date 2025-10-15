import { HallsServices } from "../services/halls.js";
import apicache from "apicache";

export class HallsController {
  static getAll = async (req, res) => {
    try {
      const halls = await HallsServices.getAll();
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
      const hall = await HallsServices.getById({ id });

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
    try {
      const newHall = await HallsServices.create(req.body);
      apicache.clear("/api/v1/salones");
      res.status(201).json({ success: true, data: newHall });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { message: "Error interno del servidor." },
      });
    }
  };

  static update = async (req, res) => {
    const { id } = req.params;
    try {
      const updatedHall = await HallsServices.update({ id, input: req.body });
      apicache.clear("/api/v1/salones");
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
      await HallsServices.delete({ id });
      apicache.clear("/api/v1/salones");
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
