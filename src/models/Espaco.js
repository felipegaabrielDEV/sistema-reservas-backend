import mongoose from "mongoose";

const EspacoSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, trim: true },
    tipo: { type: String, required: true, trim: true },
    capacidade: { type: Number, required: true, min: 1 },
    recursos: { type: [String], default: [] },
    precoHora: { type: Number, default: 0, min: 0 },
    ativo: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Espaco = mongoose.model("Espaco", EspacoSchema);
