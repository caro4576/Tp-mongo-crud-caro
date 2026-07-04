import { Router } from "express";
import {
  getAllFrutas,
  getFrutaById,
  getFrutasByNombre,
  getFrutasByImporte,
  addFruta,
  updateFruta,
  deleteFruta,
} from "../db/frutasStore.js";

const router = Router();

// GET /frutas - trae todas las frutas
router.get("/", async (req, res, next) => {
  try {
    const frutas = await getAllFrutas();

    if (frutas.length === 0) {
      const error = new Error("No se encontraron frutas");
      error.status = 404;
      return next(error);
    }

    res.json(frutas);
  } catch (error) {
    next(error);
  }
});

// GET /frutas/nombre/:nombre - busca por nombre o parte del nombre
router.get("/nombre/:nombre", async (req, res, next) => {
  try {
    const { nombre } = req.params;
    const frutas = await getFrutasByNombre(nombre);

    if (frutas.length === 0) {
      const error = new Error("No se encontraron frutas con ese nombre");
      error.status = 404;
      return next(error);
    }

    res.json(frutas);
  } catch (error) {
    next(error);
  }
});

// GET /frutas/importe/:importe - busca frutas con importe mayor o igual
router.get("/importe/:importe", async (req, res, next) => {
  try {
    const { importe } = req.params;

    if (Number.isNaN(Number(importe))) {
      const error = new Error("El importe debe ser un numero");
      error.status = 400;
      return next(error);
    }

    const frutas = await getFrutasByImporte(importe);

    if (frutas.length === 0) {
      const error = new Error("No se encontraron frutas con ese importe");
      error.status = 404;
      return next(error);
    }

    res.json(frutas);
  } catch (error) {
    next(error);
  }
});

// GET /frutas/:id - busca una fruta por id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (Number.isNaN(Number(id))) {
      const error = new Error("El id debe ser un numero");
      error.status = 400;
      return next(error);
    }

    const fruta = await getFrutaById(id);

    if (!fruta) {
      const error = new Error("Fruta no encontrada");
      error.status = 404;
      return next(error);
    }

    res.json(fruta);
  } catch (error) {
    next(error);
  }
});

// POST /frutas - crea una fruta nueva
router.post("/", async (req, res, next) => {
  try {
    const { id, imagen = "", nombre, importe, stock } = req.body || {};

    if (!id || Number.isNaN(Number(id))) {
      const error = new Error("El campo id es obligatorio y debe ser numerico");
      error.status = 400;
      return next(error);
    }

    if (!nombre || typeof nombre !== "string") {
      const error = new Error("El campo nombre es obligatorio");
      error.status = 400;
      return next(error);
    }

    if (importe === undefined || Number.isNaN(Number(importe))) {
      const error = new Error(
        "El campo importe es obligatorio y debe ser numerico",
      );
      error.status = 400;
      return next(error);
    }

    if (stock === undefined || Number.isNaN(Number(stock))) {
      const error = new Error(
        "El campo stock es obligatorio y debe ser numerico",
      );
      error.status = 400;
      return next(error);
    }

    const fruta = {
      id: Number(id),
      imagen,
      nombre,
      importe: Number(importe),
      stock: Number(stock),
    };

    const nuevaFruta = await addFruta(fruta);

    res.status(201).json(nuevaFruta);
  } catch (error) {
    next(error);
  }
});

// PUT /frutas/:id - modifica una fruta existente
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { imagen = "", nombre, importe, stock } = req.body || {};

    if (Number.isNaN(Number(id))) {
      const error = new Error("El id debe ser un numero");
      error.status = 400;
      return next(error);
    }

    if (!nombre || typeof nombre !== "string") {
      const error = new Error("El campo nombre es obligatorio");
      error.status = 400;
      return next(error);
    }

    if (importe === undefined || Number.isNaN(Number(importe))) {
      const error = new Error(
        "El campo importe es obligatorio y debe ser numerico",
      );
      error.status = 400;
      return next(error);
    }

    if (stock === undefined || Number.isNaN(Number(stock))) {
      const error = new Error(
        "El campo stock es obligatorio y debe ser numerico",
      );
      error.status = 400;
      return next(error);
    }

    const result = await updateFruta(id, {
      imagen,
      nombre,
      importe: Number(importe),
      stock: Number(stock),
    });

    if (result.matchedCount === 0) {
      const error = new Error("Fruta no encontrada");
      error.status = 404;
      return next(error);
    }

    const frutaActualizada = await getFrutaById(id);

    res.status(200).json(frutaActualizada);
  } catch (error) {
    next(error);
  }
});

// DELETE /frutas/:id - elimina una fruta
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (Number.isNaN(Number(id))) {
      const error = new Error("El id debe ser un numero");
      error.status = 400;
      return next(error);
    }

    const result = await deleteFruta(id);

    if (result.deletedCount === 0) {
      const error = new Error("Fruta no encontrada");
      error.status = 404;
      return next(error);
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
