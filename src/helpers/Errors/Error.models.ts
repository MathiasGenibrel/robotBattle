export class ErrorModel {
  public static BadRequest = {
    status: 400,
    name: "BadRequest",
    message: "Bad Request",
  };

  public static Unauthorized = {
    status: 401,
    name: "Unauthorized",
    message: "Unauthorized",
  };

  public static Forbidden = {
    status: 403,
    name: "Forbidden",
    message: "Forbidden",
  };

  public static NotFound = {
    status: 404,
    name: "Not Found",
    message: "Not Found",
  };

  public static MethodNotAllowed = {
    status: 405,
    name: "Method Not Allowed",
    message: "Method Not Allowed",
  };

  public static InternalServerError = {
    status: 500,
    name: "Internal Server Error",
    message: "Internal Server Error",
  };

  public static NotImplemented = {
    status: 501,
    name: "Not Implemented",
    message: "Not Implemented",
  };
}
