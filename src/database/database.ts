import mysql from "mysql2";

import { config } from "../config/config";

export const connection = mysql.createConnection({
  host: config.database.host,
  user: config.database.username,
  password: config.database.password,
  database: config.database.schema,
});
