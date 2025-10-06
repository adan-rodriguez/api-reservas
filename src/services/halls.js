import { Halls } from "../db/halls.js";

export class HallsServices {
  static async getAll() {
    return Halls.getAll();
  }

  static async getById({ id }) {
    return Halls.getById({ id });
  }

  static async create(input) {
    return Halls.create(input);
  }

  static async update({ id, input }) {
    return Halls.update({ id, input });
  }

  static async delete({ id }) {
    return Halls.delete({ id });
  }
}
