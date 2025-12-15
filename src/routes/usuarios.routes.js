import { Router } from "express";
import * as controller from "../controllers/usuarios.controller.js";

const router = Router();

// ✅ Rota pública (para a tela de Login listar usuários)
router.get("/public", controller.listarPublico);

router.get("/", controller.listar);
router.get("/:id", controller.buscar);
router.post("/", controller.criar);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.remover);

export default router;
