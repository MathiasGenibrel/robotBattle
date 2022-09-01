import Joi from "joi";
import { Database } from "../../database/Database";
import { HttpException } from "../../helpers/Errors/HttpException";

// Import interfaces
import { IMiddleware } from "./AuthValidation.types";

export class AuthValidation {
  /**
   * Schema for JOI validation
   */
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

  /**
   * Check if the user is already logged in.
   * @param req {Request} Express Request
   * @param res {Response} Express Response
   * @param next {NextFunction} Express NextFunction
   * @returns {void | Error} - Redirect to main page Or send an unauthorized error
   */
  public static userConnected: IMiddleware = async (req, res, next) => {
    const username = req.session.user?.username;
    const userId = req.session.user?.id.toString();

    try {
      if (req.session.user && username && userId) {
        const [user] = await Database.find({
          table: "users",
          columns: ["id", "username"],
          where: {
            column: ["id", "username"],
            operator: "=",
            value: [userId, username],
          },
        });

        if (!user) throw new Error("User not found");

        return res.redirect("/");
      }

      if (req.path === "/register" || req.path === "/login") return next();
      throw new Error("User not connected");
    } catch (error) {
      return new HttpException(res, error).Unauthorized({ hideError: true });
    }
  };

  /**
   * Check and validate if the Joi schema is correct.
   * If the schema is correct, the next function will be executed.
   * Else an error will be thrown. (Bad Request) Hidden on production.
   * @param req {Request} Express Request
   * @param res {Response} Express Response
   * @param next {NextFunction} Express NextFunction
   * @returns If the schema is valid, call the next middleware
   */
  public static register: IMiddleware = (req, res, next) => {
    const { error } = this.schema.register.validate(req.body);

    if (error) {
      return new HttpException(res, error).BadRequest({ hideError: true });
    }

    next();
  };

  /**
   * Check and validate if the Joi schema is correct.
   * If the schema is correct, the next function will be executed.
   * Else an error will be thrown. (Bad Request) Hidden on production.
   * @param req {Request} Express Request
   * @param res {Response} Express Response
   * @param next {NextFunction} Express NextFunction
   * @returns If the schema is valid, call the next middleware
   */
  public static login: IMiddleware = (req, res, next) => {
    const { error } = this.schema.login.validate(req.body);

    if (error) {
      return new HttpException(res, error).BadRequest({ hideError: true });
    }

    next();
  };
}
