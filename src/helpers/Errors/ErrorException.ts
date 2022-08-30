import { response } from "express";

import { config } from "../../config/config";

export class ErrorException {
  protected status: number;
  protected message: string;
  protected ErrorModel?: object | Error;

  constructor(status: number, message: string, ErrorModel?: object | Error) {
    this.status = status;
    this.message = message;
    this.ErrorModel = ErrorModel;
  }

  private logError(): void {
    console.error({
      status: this.status,
      message: this.message,
      ErrorModel: this.ErrorModel,
    });
  }

  public send(hideError = false) {
    this.logError();

    if (config.environment === "prod" && hideError)
      return response.status(500).send("Internal Server Error");

    return response.status(this.status).send(this.message);
  }
}
