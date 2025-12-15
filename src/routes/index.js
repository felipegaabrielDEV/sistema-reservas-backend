import { Router } from "express";
import espacosRoutes from "./espacos.routes.js";
import usuariosRoutes from "./usuarios.routes.js";
import reservasRoutes from "./reservas.routes.js";

const routes = Router();

routes.use("/espacos", espacosRoutes);
routes.use("/usuarios", usuariosRoutes);
routes.use("/reservas", reservasRoutes);

export default routes;
