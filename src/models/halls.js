import mysql from "mysql2/promise";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from "../config.js";


const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export class HallsModel {
  static async getAll() {
    const [rows] = await pool.execute(
      "SELECT * FROM salones WHERE activo = 1"
    );
    return rows;
  }

  static async getById({ id }) {
    const [[hall]] = await pool.execute(
      "SELECT * FROM salones WHERE salon_id = ? AND activo = 1",
      [id]
    );
    return hall;
  }

  static async create({ titulo, direccion, importe }) {
    const [result] = await pool.execute(
      "INSERT INTO salones (titulo, direccion, importe) VALUES (?,?,?)",
      [titulo, direccion, importe]
    );
    const [[newHall]] = await pool.execute(
      "SELECT * FROM salones WHERE salon_id = ?",
      [result.insertId]
    );
    return newHall;
  }

  static async update({ id, input }) {
    const { titulo } = input;
    const [{ affectedRows }] = await pool.execute(
      "UPDATE salones SET titulo = ? WHERE salon_id = ?",
      [titulo, id]
    );
    if (affectedRows === 0) throw new Error("Salón no encontrado.");
    const [[updatedHall]] = await pool.execute(
      "SELECT * FROM salones WHERE salon_id = ?",
      [id]
    );
    return updatedHall;
  }

  static async delete({ id }) {
    const [{ affectedRows }] = await pool.execute(
      "UPDATE salones SET activo = 0 WHERE salon_id = ?",
      [id]
    );
    if (affectedRows === 0) throw new Error("Salón no encontrado.");
    return id;
  }
}