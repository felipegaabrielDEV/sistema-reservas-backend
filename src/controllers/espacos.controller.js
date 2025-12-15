import { Espaco } from "../models/Espaco.js";
import { AppError } from "../utils/AppError.js";

export async function listar(req, res) {
  const filtros = {};
  if (req.query.tipo) filtros.tipo = req.query.tipo;
  if (req.query.ativo) filtros.ativo = req.query.ativo === "true";

  const espacos = await Espaco.find(filtros).sort({ createdAt: -1 });
  res.json(espacos);
}

export async function buscar(req, res) {
  const espaco = await Espaco.findById(req.params.id);
  if (!espaco) throw new AppError("Espaço não encontrado.", 404);
  res.json(espaco);
}

export async function criar(req, res) {
  const espaco = await Espaco.create(req.body);
  res.status(201).json(espaco);
}

export async function atualizar(req, res) {
  const espaco = await Espaco.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!espaco) throw new AppError("Espaço não encontrado.", 404);
  res.json(espaco);
}

export async function remover(req, res) {
  const espaco = await Espaco.findByIdAndDelete(req.params.id);
  if (!espaco) throw new AppError("Espaço não encontrado.", 404);
  res.status(204).send();
}
