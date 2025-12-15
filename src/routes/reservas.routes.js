import { Router } from "express";
import * as controller from "../controllers/reservas.controller.js";

const router = Router();

router.get("/", controller.listar);
router.get("/agenda", controller.agenda);
router.get("/:id", controller.buscar);
router.post("/", controller.criar);
router.put("/:id", controller.atualizar);
router.patch("/:id/cancelar", controller.cancelar);

export default router;
