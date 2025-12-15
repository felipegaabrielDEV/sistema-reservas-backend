import { Reserva } from "../models/Reserva.js";
import { AppError } from "../utils/AppError.js";

export async function garantirSemConflito({ espacoId, inicio, fim, ignorarReservaId = null }) {
  const i = new Date(inicio);
  const f = new Date(fim);

  if (Number.isNaN(i.getTime()) || Number.isNaN(f.getTime())) {
    throw new AppError("Datas inválidas (inicio/fim).", 400);
  }

  if (i >= f) {
    throw new AppError("Horário inválido: 'inicio' precisa ser menor que 'fim'.", 400);
  }

  // Conflito se: novoInicio < existenteFim AND novoFim > existenteInicio
  const filtro = {
    espacoId,
    status: "ativa",
    inicio: { $lt: f },
    fim: { $gt: i },
  };

  if (ignorarReservaId) filtro._id = { $ne: ignorarReservaId };

  const existe = await Reserva.findOne(filtro).lean();
  if (existe) {
    throw new AppError("Conflito de horário: já existe reserva nesse período.", 409, {
      reservaConflitanteId: String(existe._id),
      inicio: existe.inicio,
      fim: existe.fim,
    });
  }
}
