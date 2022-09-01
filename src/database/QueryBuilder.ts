import { IWhere } from "./QueryBuilder.types";

export abstract class QueryBuilder {
  private static whereCondition = (where: IWhere) => {
    console.log("where: ", where);
    return `WHERE ${where.column} ${where.operator} '${where.value}'`;
  };

  protected static insert = (table: string, columns: string[]) => {
    const numberData = columns.map(() => "?");

    const query = `INSERT INTO ${table} (${columns.join(
      ", "
    )}) VALUES (${numberData.join(", ")})`;

    return query;
  };

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
