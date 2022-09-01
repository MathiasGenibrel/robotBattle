export type IWhere = {
  column: string | string[];
  operator: "=" | "!=" | ">" | "<" | ">=" | "<=" | "BETWEEN" | "LIKE" | "IN";
  value: string | string[];
};
