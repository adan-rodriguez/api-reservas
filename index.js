import express from "express";
import mysql from "mysql2/promise";
import { PORT } from "./config.js";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "reservas",
});

const app = express();
app.use(express.json());

app.get("/salones", async (req, res) => {
  const [halls] = await connection.query("SELECT * FROM salones");
  res.json(halls);
});

app.get("/salones/:id", async (req, res) => {
  const { id } = req.params;

  const [[hall]] = await connection.query(
    "SELECT * FROM salones WHERE salon_id = ?",
    [id]
  );
  res.json(hall);
});

app.post("/salones", async (req, res) => {
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

app.patch("/salones/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo } = req.body;

  const [result] = await connection.query(
    "UPDATE salones SET titulo = ? WHERE salon_id = ?",
    [titulo, id]
  );
  res.json(result);
});

app.delete("/salones/:id", async (req, res) => {
  const { id } = req.params;

  const [result] = await connection.query(
    "DELETE FROM salones WHERE salon_id = ?",
    [id]
  );
  res.json(result);
});

app.use((req, res) => {
    res.status(404).json({ error: 'not found', message: 'no existe este endpoint' })
  })

app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
