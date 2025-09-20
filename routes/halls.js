import { Router } from "express";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "reservas",
});

export const hallsRouter = Router();

hallsRouter.get("/", async (req, res) => {
  const [halls] = await connection.query("SELECT * FROM salones");
  res.json(halls);
});

hallsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const [[hall]] = await connection.query(
    "SELECT * FROM salones WHERE salon_id = ?",
    [id]
  );
  res.json(hall);
});

hallsRouter.post("/", async (req, res) => {
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
});

hallsRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo } = req.body;

  const [result] = await connection.query(
    "UPDATE salones SET titulo = ? WHERE salon_id = ?",
    [titulo, id]
  );
  res.json(result);
});

hallsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const [result] = await connection.query(
    "DELETE FROM salones WHERE salon_id = ?",
    [id]
  );
  res.json(result);
});
