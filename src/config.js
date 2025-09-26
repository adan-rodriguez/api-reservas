// try {
//   process.loadEnvFile();
// } catch (err) {
//   console.warn("⚠️ No se encontró el archivo .env");
// }

// ACTUALICEN A LA ÚLTIMA VERSIÓN ESTABLE DE NODE!!!

export const {
  PORT = 3000,
  DB_HOST = "localhost",
  DB_USER = "root",
  DB_PASSWORD = "",
  DB_NAME = "reservas",
} = process.env;
