export type IWhere = {
  column: string;
  operator: "=" | "!=" | ">" | "<" | ">=" | "<=" | "BETWEEN" | "LIKE" | "IN";
  value: string;
};
