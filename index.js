import express from "express"
import mysql from "mysql2/promise"

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "reservas"
})

const app = express()
app.use(express.json())

app.get("/salones", async (req, res) => {
    const [halls] = await connection.query("SELECT * FROM salones")
    res.json(halls)
})

app.get("/salones/:id", async (req, res) => {
    const {id} = req.params
    const [[hall]] = await connection.query("SELECT * FROM salones WHERE salon_id = ?", [id])
    res.json(hall)
})

app.post("/salones", async (req, res) => {
    const { titulo, direccion, importe } = req.body
    
    const [result] = await connection.query('INSERT INTO salones (titulo, direccion, importe) VALUES (?, ?, ?)',
        [titulo, direccion, importe])
        
        const [[newHall]] = await connection.query('SELECT * FROM salones WHERE salon_id = ?', [result.insertId])
        res.json(newHall)
})

app.listen(3000, console.log("Servidor escuchando en http://localhost:3000"))