import mysql, { RowDataPacket } from "mysql2/promise";

import { config } from "../config/config";
import { IQueryInsert, IQuerySelect } from "./Database.types";
import { QueryBuilder } from "./QueryBuilder";

let CONNECTION: mysql.Connection | null = null;
export class Database extends QueryBuilder {
  /**
   * Create a new connection to the database if there is no connection.
   * When the connection is created, the connection is stored in the CONNECTION variable.
   * @returns {Promise<mysql.Connection>} - Connection to the database
   */
  private static setConnection = async () => {
    if (!CONNECTION)
      CONNECTION = await mysql.createConnection({
        host: config.database.host,
        user: config.database.username,
        password: config.database.password,
        database: config.database.schema,
      });

    return CONNECTION;
  };

  public static create = async (option: IQueryInsert) => {
    const connection = await this.setConnection();

    // Get insert query from QueryBuilder
    const query = this.insert(option.table, option.columns);

    // Insert Data into database
    const [result] = await connection.execute(query, option.data);

    return result as RowDataPacket[];
  };

  public static find = async (option: IQuerySelect) => {
    const connection = await this.setConnection();

    // Get select query from QueryBuilder
    const query = this.select(option.table, option.columns, option.where);

    // Insert Data into database
    const [result] = await connection.execute(query);

    return result as RowDataPacket[];
  };
}
