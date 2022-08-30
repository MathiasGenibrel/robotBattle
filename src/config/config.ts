import * as dotenv from "dotenv";

dotenv.config({ path: "../environment/.env" });

export const config = {
  database: {
    host: "localhost",
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "root",
    schema: process.env.DB_SCHEMA || "roboit",
  },
};
