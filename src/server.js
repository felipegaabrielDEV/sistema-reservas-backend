import "dotenv/config";
import { createApp } from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  await connectDB();
  const app = createApp();
  app.listen(PORT, () =>
    console.log(`🚀 API rodando em http://localhost:${PORT}`)
  );
}

bootstrap();
