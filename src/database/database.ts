import mysql, { RowDataPacket } from "mysql2/promise";

import { config } from "../config/config";
import { IQueryInsert, IQuerySelect } from "./Database.types";
import { QueryBuilder } from "./QueryBuilder";

// TODO Try to replace with a singleton pattern for the connection to the DB
export class Database extends QueryBuilder {
  private static setConnection = async () => {
    const connection = await mysql.createConnection({
      host: config.database.host,
      user: config.database.username,
      password: config.database.password,
      database: config.database.schema,
    });

    return connection;
  };

  public static create = async (option: IQueryInsert) => {
    const connection = await this.setConnection();

    // Get insert query from QueryBuilder
    const query = this.insert(option.table, option.columns);

    // Insert Data into database
    const [result] = await connection.execute(query, option.data);

    connection.end();

    return result as RowDataPacket[];
  };

  public static find = async (option: IQuerySelect) => {
    const connection = await this.setConnection();

    // Get select query from QueryBuilder
    const query = this.select(option.table, option.columns, option.where);

    // Insert Data into database
    const [result] = await connection.execute(query);

    connection.end();

    return result as RowDataPacket[];
  };
}
