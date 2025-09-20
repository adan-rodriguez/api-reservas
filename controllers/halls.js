import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "reservas",
});

export class HallsController {
  static getAll = async (req, res) => {
  const [halls] = await connection.query("SELECT * FROM salones");
  res.json(halls);
}

  static getById = async (req, res) => {
  const { id } = req.params;

  const [[hall]] = await connection.query(
    "SELECT * FROM salones WHERE salon_id = ?",
    [id]
  );
  res.json(hall);
}

  static create = async (req, res) => {
  const { titulo, direccion, importe } = req.body;

  const [result] = await connection.query(
    "INSERT INTO salones (titulo, direccion, importe) VALUES (?, ?, ?)",
    [titulo, direccion, importe]
  );

  const [[newHall]] = await connection.query(
    "SELECT * FROM salones WHERE salon_id = ?",
    [result.insertId]
  );
  res.json(newHall);
}

  static update = async (req, res) => {
  const { id } = req.params;
  const { titulo } = req.body;

  const [result] = await connection.query(
    "UPDATE salones SET titulo = ? WHERE salon_id = ?",
    [titulo, id]
  );
  res.json(result);
}

  static delete = async (req, res) => {
  const { id } = req.params;

  const [result] = await connection.query(
    "DELETE FROM salones WHERE salon_id = ?",
    [id]
  );
  res.json(result);
}
}
