import { HallsModel } from "../models/halls.js";

export class HallsController {
  static getAll = async (req, res) => {
    const halls = await HallsModel.getAll();
    res.json(halls);
  };

  static getById = async (req, res) => {
    const { id } = req.params;
    const hall = await HallsModel.getById({ id });
    res.json(hall);
  };

  static create = async (req, res) => {
    const newHall = await HallsModel.create(req.body);
    res.status(201).json(newHall);
  };

  static update = async (req, res) => {
    const { id } = req.params;
    const updatedHall = await HallsModel.update({ id, input: req.body });
    res.json(updatedHall);
  };

  static delete = async (req, res) => {
    const { id } = req.params;

    const result = await HallsModel.delete({ id });
    res.json(result);
  };
}
