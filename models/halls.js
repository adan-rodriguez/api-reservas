import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "reservas",
});

export class HallsModel {
  static async getAll() {
    const [halls] = await connection.query("SELECT * FROM salones");
    return halls;
  }

  static async getById({ id }) {
    const [[hall]] = await connection.query(
      "SELECT * FROM salones WHERE salon_id = ?",
      [id]
    );
    return hall;
  }

  static async create(input) {
    const { titulo, direccion, importe } = input;

    const [result] = await connection.query(
      "INSERT INTO salones (titulo, direccion, importe) VALUES (?, ?, ?)",
      [titulo, direccion, importe]
    );

    const [[newHall]] = await connection.query(
      "SELECT * FROM salones WHERE salon_id = ?",
      [result.insertId]
    );
    return newHall;
  }

  static async update({ id, input }) {
    const { titulo } = input;
    const [result] = await connection.query(
      "UPDATE salones SET titulo = ? WHERE salon_id = ?",
      [titulo, id]
    );
    return result;
  }

  static async delete({ id }) {
    const [result] = await connection.query(
      "DELETE FROM salones WHERE salon_id = ?",
      [id]
    );
    return result;
  }
}
