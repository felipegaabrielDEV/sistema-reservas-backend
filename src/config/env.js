export const env = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
  corsOrigin: process.env.CORS_ORIGIN || "*",
  nodeEnv: process.env.NODE_ENV || "development",
};
