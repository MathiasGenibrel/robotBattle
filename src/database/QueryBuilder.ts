import { IWhere } from "./QueryBuilder.types";

export abstract class QueryBuilder {
  /**
   * Create and format the where clause for the query to the Database.
   * @param {Object} where - Where clause
   * @property {string | string[]} column  - column for the were clause (username = "John")
   * @property {string | string[]} operator  - operator for the where clause (=, !=, >, <, etc)
   * @property {string | string[]} value  - value for the where clause ("John", "Doe", "1", etc)
   * @returns Where clause in string format for query
   */
  private static whereCondition = (where: IWhere) => {
    // Check if the where condition column and value have the same type
    if (typeof where.column !== typeof where.value)
      throw new Error("You cannot have a different type of column and value");

    if (typeof where.column === "string")
      return `WHERE ${where.column} ${where.operator} '${where.value}'`;

    const whereCondition = where.column.map((column, index) => {
      return `${column} ${
        typeof where.operator === "string"
          ? where.operator
          : where.operator[index]
      } '${where.value[index]}'`;
    });
    return `WHERE ${whereCondition.join(" AND ")}`;
  };

  /**
   * Create and format INSERT INTO clause for the query to the Database.
   * @param table {string} - table to query
   * @param columns {array<string>} - Array contains the columns to insert the data in the table
   * @returns The query to insert the data in the table
   */
  protected static insert = (table: string, columns: string[]) => {
    const numberData = columns.map(() => "?");

    const query = `INSERT INTO ${table} (${columns.join(
      ", "
    )}) VALUES (${numberData.join(", ")})`;

    return query;
  };

  /**
   * Create and format SELECT clause for the query to the Database.
   * @param table {string} - table to query
   * @param columns {array<string>} - Array contains the columns to insert the data in the table
   * @param where {Object} - Where clause
   * @property {string | string[]} column - column for the were clause (username = "John")
   * @property {string | string[]} operator - operator for the where clause (=, !=, >, <, etc)
   * @property {string | string[]} value - value for the where clause ("John", "Doe", "1", etc)
   * @returns The query to get data from the current table
   */
  protected static select = (
    table: string,
    columns: string[] | string = "*",
    where?: IWhere
  ) => {
    let query: string;

    if (typeof columns === "string") query = `SELECT ${columns} FROM ${table}`;
    else query = `SELECT ${columns.join(", ")} FROM ${table}`;

    if (where) return `${query} ${this.whereCondition(where)}`;
    return query;
  };
}
