// Import dependency
import bcrypt from "bcrypt";

// Import class
import { HttpException } from "../helpers/Errors/HttpException";
import { config } from "../config/config";
import { Database } from "../database/Database";

// Import interfaces
import { IRender, IRegister, ILogin } from "./User.types";

class User {
  /**
   * According to the path, the user is redirected to the login page or the registration page.
   * @param req {Request} Express Request
   * @param res {Response} Express Response
   * @returns {void} Render the page
   */
  public static render: IRender = (req, res) => {
    if (req.path === "/register") return res.render(`register.ejs`);
    return res.render(`login.ejs`);
  };

  /**
   * Create a new user, hash password and insert into database.
   * When the user is created, is logged in and redirected to the home page.
   * @param req {Request} Express Request
   * @param res {Response} Express Response
   * @returns {void} - User account created, logged and redirect to main page
   */
  public static register: IRegister = async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(
        req.body.password,
        config.saltRounds
      );

      const result = await Database.create({
        table: "users",
        columns: ["username", "email", "password"],
        data: [req.body.username, req.body.email, hashedPassword],
      });

      if (result.length === 0) throw new Error("User not created");
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
  public static login: ILogin = async (req, res) => {
    try {
      const [user] = await Database.find({
        table: "users",
        columns: ["username", "email", "password"],
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

      // Redirect if users is logged
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
