import { connection } from "./connection.js";

export class Halls {
  static async getAll() {
    const [halls] = await connection.execute(
      "SELECT * FROM salones WHERE activo = 1"
    );
    return halls;
  }

  static async getById({ id }) {
    const [[hall]] = await connection.execute(
      "SELECT * FROM salones WHERE salon_id = ? AND activo = 1",
      [id]
    );
    return hall;
  }

  static async create(input) {
    const { titulo, direccion, importe } = input;

    const [result] = await connection.execute(
      "INSERT INTO salones (titulo, direccion, importe) VALUES (?, ?, ?)",
      [titulo, direccion, importe]
    );

    const [[newHall]] = await connection.execute(
      "SELECT * FROM salones WHERE salon_id = ?",
      [result.insertId]
    );
    return newHall;
  }

  static async update({ id, input }) {
    const { titulo } = input;
    const [{ affectedRows }] = await connection.execute(
      "UPDATE salones SET titulo = ? WHERE salon_id = ?",
      [titulo, id]
    );

    if (affectedRows === 0) {
      throw new Error("Salón no encontrado.");
    }

    const [[updatedHall]] = await connection.execute(
      "SELECT * FROM salones WHERE salon_id = ?",
      [id]
    );
    return updatedHall;
  }

  static async delete({ id }) {
    const [{ affectedRows }] = await connection.execute(
      "UPDATE salones SET activo = 0 WHERE salon_id = ?",
      [id]
    );
    if (affectedRows === 0) {
      throw new Error("Salón no encontrado.");
    }
    return id;
  }
}
