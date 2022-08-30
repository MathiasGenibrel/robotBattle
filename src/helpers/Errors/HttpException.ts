import { ErrorException } from "./ErrorException";
import { ErrorModel } from "./Error.models";

// Import interface
import { IError, IHttpException } from "./Error.types";

export class HttpException {
  currentError: string | Error;

  constructor(error: unknown) {
    if (error instanceof Error) this.currentError = error;
    else this.currentError = "Unknown error";
  }

  private sendError: IHttpException = (errorType, option) => {
    return new ErrorException(
      option?.status || ErrorModel[errorType].status,
      option?.message || ErrorModel[errorType].message,
      option?.model
    ).send(option?.hideError);
  };

  public BadRequest: IError = (option) => {
    this.sendError("BadRequest", option);
  };

  public Unauthorized: IError = (option) => {
    this.sendError("Unauthorized", option);
  };

  public Forbidden: IError = (option) => {
    this.sendError("Forbidden", option);
  };

  public NotFound: IError = (option) => {
    this.sendError("NotFound", option);
  };

  public MethodNotAllowed: IError = (option) => {
    this.sendError("MethodNotAllowed", option);
  };

  public InternalServerError: IError = (option) => {
    this.sendError("InternalServerError", option);
  };

  public NotImplemented: IError = (option) => {
    this.sendError("NotImplemented", option);
  };
}
