import mysql from "mysql2/promise";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from "../config.js";

const connection = await mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

export class HallsModel {
  static async getAll() {
    const [halls] = await connection.execute("SELECT * FROM salones");
    return halls;
  }

  static async getById({ id }) {
    const [[hall]] = await connection.execute(
      "SELECT * FROM salones WHERE salon_id = ?",
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
    const [result] = await connection.execute(
      "UPDATE salones SET titulo = ? WHERE salon_id = ?",
      [titulo, id]
    );
    return result;
  }

  static async delete({ id }) {
    const [result] = await connection.execute(
      "DELETE FROM salones WHERE salon_id = ?",
      [id]
    );
    return result;
  }
}
