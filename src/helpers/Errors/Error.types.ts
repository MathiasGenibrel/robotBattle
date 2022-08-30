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

export interface IError {
  (option?: IOptions): void;
}

export interface IHttpException {
  (typeError: ITypeError, option?: IOptions): void;
}
