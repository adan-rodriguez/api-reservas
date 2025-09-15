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

app.get("/reservas", async (req, res) => {
    const [reservations] = await connection.query("SELECT * FROM reservas")
    res.json(reservations)
})

app.get("/reservas/:id", async (req, res) => {
    const {id} = req.params
    const [[reservation]] = await connection.query("SELECT * FROM reservas WHERE reserva_id = ?", [id])
    res.json(reservation)
})

app.patch("/reservas", async (req, res) => {
    const body = req.body
    console.log(body);
    res.json({})
})

app.listen(3000, console.log("Servidor escuchando en http://localhost:3000"))