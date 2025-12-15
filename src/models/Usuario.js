import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    telefone: { type: String, default: "" },
    role: { type: String, enum: ["admin", "cliente"], default: "cliente" },
  },
  { timestamps: true }
);

export const Usuario = mongoose.model("Usuario", UsuarioSchema);
