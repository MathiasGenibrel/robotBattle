import { Response } from "express";

type IOptions = {
  message?: string;
  status?: number;
  model?: object | Error;
  hideError?: boolean;
};

type ITypeError =
  | "BadRequest"
  | "Unauthorized"
  | "Forbidden"
  | "NotFound"
  | "MethodNotAllowed"
  | "InternalServerError"
  | "NotImplemented";

export type IErrorConstructor = {
  response: Response;
  status: number;
  message: string;
  originalMessage: string;
  name: string;
  ErrorModel?: object | Error;
};
export interface IError {
  (option?: IOptions): void;
}

export interface IHttpException {
  (typeError: ITypeError, option?: IOptions): void;
}
