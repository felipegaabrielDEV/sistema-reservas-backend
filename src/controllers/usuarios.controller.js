import { Usuario } from "../models/Usuario.js";
import { AppError } from "../utils/AppError.js";

// ✅ ROTA PÚBLICA PARA LOGIN
// Se seu model NÃO tiver campo "ativo", troque o find({ ativo: true }) por find()
export async function listarPublico(req, res) {
  const usuarios = await Usuario.find({ ativo: true }).sort({ createdAt: -1 });
  return res.json(usuarios);
}

export async function listar(req, res) {
  const usuarios = await Usuario.find().sort({ createdAt: -1 });
  res.json(usuarios);
}

export async function buscar(req, res) {
  const usuario = await Usuario.findById(req.params.id);
  if (!usuario) throw new AppError("Usuário não encontrado.", 404);
  res.json(usuario);
}

export async function criar(req, res) {
  const usuario = await Usuario.create(req.body);
  res.status(201).json(usuario);
}

export async function atualizar(req, res) {
  const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!usuario) throw new AppError("Usuário não encontrado.", 404);
  res.json(usuario);
}

export async function remover(req, res) {
  const usuario = await Usuario.findByIdAndDelete(req.params.id);
  if (!usuario) throw new AppError("Usuário não encontrado.", 404);
  res.status(204).send();
}
