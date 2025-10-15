## Instalación

1. Clona el repositorio.
2. Instala dependencias:

   ```sh
   npm install
   ```

3. Configura el archivo `.env`:

   ```
   DB_HOST=localhost
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=reservas
   PORT=3000
   ```

4. Inicia el servidor:

   ```sh
   npm start
   ```

## Endpoints

- `GET /api/v1/salones` — Listar salones
- `GET /api/v1/salones/:id` — Obtener salón por ID
- `POST /api/v1/salones` — Crear salón
- `PATCH /api/v1/salones/:id` — Actualizar salón
- `DELETE /api/v1/salones/:id` — Eliminar salón
