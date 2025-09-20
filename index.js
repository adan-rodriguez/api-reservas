import express from "express";
import { PORT } from "./config.js";
import { hallsRouter } from "./routes/halls.js";

const app = express();
app.use(express.json());

app.use("/salones", hallsRouter)

app.use((req, res) => {
    res.status(404).json({ error: 'not found', message: 'no existe este endpoint' })
  })

app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
