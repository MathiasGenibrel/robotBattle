import { Response } from "express";
import { config } from "../../config/config";

export class ErrorException {
  protected response: Response;
  protected status: number;
  protected message: string;
  protected name: string;
  protected ErrorModel?: object | Error;

  constructor(
    response: Response,
    status: number,
    message: string,
    name: string,
    ErrorModel?: object | Error
  ) {
    this.response = response;
    this.status = status;
    this.message = message;
    this.name = name;
    this.ErrorModel = ErrorModel;
  }

  private logError(): void {
    console.error({
      status: this.status,
      message: this.message,
      name: this.name,
      ErrorModel: this.ErrorModel,
    });
  }

  public send(hideError = false) {
    this.logError();

    if (config.environment === "prod" && hideError)
      return this.response.status(500).send("Internal Server Error");

    return this.response.status(this.status).send(this.message);
  }
}
