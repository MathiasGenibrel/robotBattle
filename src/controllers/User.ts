// Import dependency
import bcrypt from "bcrypt";

// Import class
import { HttpException } from "../helpers/Errors/HttpException";
import { config } from "../config/config";
import { Database } from "../database/Database";

// Import interfaces
import { IRender, IResponse } from "./User.types";

class User {
  private static profile: IResponse = (_req, res) => {
    // TODO Connect to DB
    const profile = {
      username: "Mithivi",
      email: "",
      robots: [
        {
          name: "R2D2",
          username: "Mithivi",
        },
      ],
    };

    res.render(`profile.ejs`, { profile });
  };

  /**
   * According to the path, the user is redirected to the login page or the registration page.
   * @param req {Request} Express Request
   * @param res {Response} Express Response
   * @returns {void} Render the page
   */
  public static render: IRender = {
    profile: User.profile,
    login: (_req, res) => res.render(`login.ejs`),
    register: (_req, res) => res.render(`register.ejs`),
  };

  /**
   * Create a new user, hash password and insert into database.
   * When the user is created, is logged in and redirected to the home page.
   * @param req {Request} Express Request
   * @param res {Response} Express Response
   * @returns {void} - User account created, logged and redirect to main page
   */
  public static register: IResponse = async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(
        req.body.password,
        config.saltRounds
      );

      const [result] = await Database.create({
        table: "users",
        columns: ["username", "email", "password"],
        data: [req.body.username, req.body.email, hashedPassword],
      });

      if (result.length === 0) throw new Error("User not created");

      // Add user to session && redirect to main page
      req.session.user = {
        username: result.username,
        id: result.id,
      };
      res.redirect("/");
    } catch (error) {
      return new HttpException(res, error).InternalServerError();
    }
  };

  /**
   * Log user to the application, and redirect to the main page of the application.
   * Add the user to the session.
   * @param req {Request} Express Request
   * @param res {Response} Express Response
   * @returns {void} - if user is logged in, redirect to home page with session cookie
   */
  public static login: IResponse = async (req, res) => {
    try {
      const [user] = await Database.find({
        table: "users",
        columns: ["id", "username", "email", "password"],
        where: {
          column: "username",
          operator: "=",
          value: req.body.username,
        },
      });

      if (user.length === 0) throw new Error("User not found");

      // Control password
      const correctPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!correctPassword) throw new Error("Password incorrect");

      // Add user to session && Redirect if users is logged
      req.session.user = {
        username: user.username,
        id: user.id,
      };
      res.redirect("/");
    } catch (error) {
      return new HttpException(res, error).BadRequest({
        message: "User / Password incorrect",
      });
    }
    return;
  };
}

export default User;
