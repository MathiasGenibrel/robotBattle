import Joi from "joi";
import { HttpException } from "../../helpers/Errors/HttpException";

// Import interfaces
import { IMiddleware } from "./AuthValidation.types";

export class AuthValidation {
  private static schema = {
    register: Joi.object({
      username: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    }),
    login: Joi.object({
      username: Joi.string().min(3).required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    }),
  };

  public static register: IMiddleware = (req, res, next) => {
    const { error } = this.schema.register.validate(req.body);

    if (error) {
      return new HttpException(res, error).BadRequest({ hideError: true });
    }

    next();
  };

  public static login: IMiddleware = (req, res, next) => {
    const { error } = this.schema.login.validate(req.body);

    if (error) {
      return new HttpException(res, error).BadRequest({ hideError: true });
    }

    next();
  };
}
