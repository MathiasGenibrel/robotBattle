import * as dotenv from "dotenv";

dotenv.config({ path: "./src/environment/.env" });

export const config = {
  environment: process.env.NODE_ENV,
  sessionSecretKey: process.env.SESSION_SECRET_KEY as string,
  database: {
    host: "localhost",
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "root",
    schema: process.env.DB_SCHEMA || "roboit",
  },
  saltRounds: 10, // Use for crypt password (bcrypt dependency)
};
