import mongoose from "mongoose";
import { AppError } from "../utils/AppError.js";

export function errorMiddleware(err, req, res, next) {
  // ObjectId inválido
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ error: "ID inválido." });
  }

  // Duplicidade unique
  if (err?.code === 11000) {
    const campos = Object.keys(err.keyValue || {});
    return res.status(409).json({
      error: "Registro duplicado.",
      details: { campos, keyValue: err.keyValue },
    });
  }

  // Erros da regra de negócio
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      details: err.details ?? undefined,
    });
  }

  console.error("🔥 Erro não tratado:", err);
  return res.status(500).json({ error: "Erro interno do servidor." });
}
