import { config } from "../../config/config";

// Import interfaces
import { Response } from "express";
import { IErrorConstructor } from "./Error.types";
export class ErrorException {
  protected response: Response;
  protected status: number;
  protected message: string;
  protected originalMessage: string;
  protected name: string;
  protected ErrorModel?: object | Error;

  constructor(builder: IErrorConstructor) {
    this.response = builder.response;
    this.status = builder.status;
    this.message = builder.message;
    this.originalMessage = builder.originalMessage;
    this.name = builder.name;
    this.ErrorModel = builder.ErrorModel;
  }

  private logError(): void {
    console.error({
      status: this.status,
      message: this.originalMessage,
      name: this.name,
      ErrorModel: this.ErrorModel,
    });
  }

  public send(hideError = false) {
    this.logError();

    // Hide error to send to the client if environment is production && hideError parameters is true
    if (config.environment === "prod" && hideError)
      return this.response.status(500).send("Internal Server Error");

    return this.response.status(this.status).send(this.message);
  }
}
