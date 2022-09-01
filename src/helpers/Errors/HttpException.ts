import { ErrorException } from "./ErrorException";
import { ErrorModel } from "./Error.models";

// Import interface
import { IError, IHttpException } from "./Error.types";
import { Response } from "express";

export class HttpException {
  private response: Response;
  private currentError?: Error;

  constructor(response: Response, error: unknown) {
    this.response = response;
    if (error instanceof Error) this.currentError = error;
  }

  private sendError: IHttpException = (errorType, option) => {
    return new ErrorException({
      response: this.response,
      status: option?.status || ErrorModel[errorType].status,
      message:
        option?.message ||
        this.currentError?.message ||
        ErrorModel[errorType].message, // Message to display to the client
      originalMessage:
        this.currentError?.message || ErrorModel[errorType].message, // Original message
      name: this.currentError?.name || ErrorModel[errorType].name,
      ErrorModel: option?.model,
    }).send(option?.hideError);
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
