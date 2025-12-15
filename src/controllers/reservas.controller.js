import { Reserva } from "../models/Reserva.js";
import { garantirSemConflito } from "../services/reservas.service.js";
import { AppError } from "../utils/AppError.js";

export async function listar(req, res) {
  const filtros = {};
  if (req.query.espacoId) filtros.espacoId = req.query.espacoId;
  if (req.query.status) filtros.status = req.query.status;

  const reservas = await Reserva.find(filtros)
    .populate("espacoId")
    .populate("usuarioId")
    .sort({ inicio: 1 });

  res.json(reservas);
}

export async function buscar(req, res) {
  const reserva = await Reserva.findById(req.params.id)
    .populate("espacoId")
    .populate("usuarioId");

  if (!reserva) throw new AppError("Reserva não encontrada.", 404);
  res.json(reserva);
}

export async function criar(req, res) {
  await garantirSemConflito(req.body);
  const reserva = await Reserva.create(req.body);
  res.status(201).json(reserva);
}

export async function atualizar(req, res) {
  await garantirSemConflito({ ...req.body, ignorarReservaId: req.params.id });

  const reserva = await Reserva.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!reserva) throw new AppError("Reserva não encontrada.", 404);

  res.json(reserva);
}

export async function cancelar(req, res) {
  const reserva = await Reserva.findByIdAndUpdate(
    req.params.id,
    { status: "cancelada" },
    { new: true }
  );

  if (!reserva) throw new AppError("Reserva não encontrada.", 404);
  res.json(reserva);
}

// Agenda: por espaço e período (query: espacoId, de, ate)
export async function agenda(req, res) {
  const { espacoId, de, ate } = req.query;

  if (!espacoId || !de || !ate) {
    throw new AppError("Informe espacoId, de e ate na query.", 400);
  }

  const inicio = new Date(de);
  const fim = new Date(ate);

  const reservas = await Reserva.find({
    espacoId,
    status: "ativa",
    inicio: { $lt: fim },
    fim: { $gt: inicio },
  })
    .populate("espacoId")
    .populate("usuarioId")
    .sort({ inicio: 1 });

  res.json(reservas);
}
