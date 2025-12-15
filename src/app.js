import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import "express-async-errors";

import routes from "./routes/index.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(compression());
  app.use(express.json());

  const origin = process.env.CORS_ORIGIN || "*";
  app.use(cors({ origin }));

  const env = process.env.NODE_ENV || "development";
  app.use(morgan(env === "development" ? "dev" : "combined"));

  app.get("/health", (req, res) => res.json({ ok: true }));

  app.use("/api", routes);

  app.use(errorMiddleware);
  return app;
}
