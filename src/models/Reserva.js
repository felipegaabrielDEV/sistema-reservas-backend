import mongoose from "mongoose";

const ReservaSchema = new mongoose.Schema(
  {
    espacoId: { type: mongoose.Schema.Types.ObjectId, ref: "Espaco", required: true },
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    inicio: { type: Date, required: true },
    fim: { type: Date, required: true },
    status: { type: String, enum: ["ativa", "cancelada"], default: "ativa" },
    observacao: { type: String, default: "" },
  },
  { timestamps: true }
);

ReservaSchema.index({ espacoId: 1, inicio: 1, fim: 1 });

export const Reserva = mongoose.model("Reserva", ReservaSchema);
