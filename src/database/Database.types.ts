import { IWhere } from "./QueryBuilder.types";

export type IQueryInsert = {
  table: string;
  columns: string[];
  data: string[];
};

export type IQuerySelect = {
  table: string;
  columns: string[] | string;
  where?: IWhere;
};
