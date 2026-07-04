import "dotenv/config";
import express from "express";
import healthRouter from "./src/routes/health.js";
import frutasRouter from "./src/routes/frutas.js";

const PORT = process.env.PORT || 3000;
const server = express();

// Permite leer JSON en req.body
server.use(express.json());

// Rutas del servidor
server.use("/health", healthRouter);
server.use("/frutas", frutasRouter);

// Ruta no encontrada
server.use((req, res, next) => {
  const error = new Error(`Not Found: ${req.method} ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

// Manejo general de errores
server.use((err, req, res, next) => {
  const status = err.status || 500;
  res
    .status(status)
    .json({ status, error: err.message || "Internal Server Error" });
});

server.listen(PORT, (err) => {
  if (err) {
    console.error("Error al iniciar el servidor:", err);
    return;
  }
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});
