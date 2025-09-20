import { HallsModel } from "../models/halls.js";

export class HallsController {
  static getAll = async (req, res) => {
    try {
      const halls = await HallsModel.getAll();
      res.json(halls);
    } catch (error) {
      res.status(500).json(error.message);
    }
  };

  static getById = async (req, res) => {
    const { id } = req.params;
    try {
      const hall = await HallsModel.getById({ id });
      res.json(hall);
    } catch (error) {
      res.status(500).json(error.message);
    }
  };

  static create = async (req, res) => {
    try {
      const newHall = await HallsModel.create(req.body);
      res.status(201).json(newHall);
    } catch (error) {
      res.status(500).json(error.message);
    }
  };

  static update = async (req, res) => {
    const { id } = req.params;
    try {
      const updatedHall = await HallsModel.update({ id, input: req.body });
      res.json(updatedHall);
    } catch (error) {
      res.status(500).json(error.message);
    }
  };

  static delete = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await HallsModel.delete({ id });
      res.json(result);
    } catch (error) {
      res.status(500).json(error.message);
    }
  };
}
