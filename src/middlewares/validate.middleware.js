import { AppError } from "../utils/AppError.js";

export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      throw new AppError("Dados inválidos.", 400, result.error.flatten());
    }

    req.validated = result.data;
    next();
  };
}
