export class ErrorModel {
  public static BadRequest = {
    status: 400,
    message: "Bad Request",
  };

  public static Unauthorized = {
    status: 401,
    message: "Unauthorized",
  };

  public static Forbidden = {
    status: 403,
    message: "Forbidden",
  };

  public static NotFound = {
    status: 404,
    message: "Not Found",
  };

  public static MethodNotAllowed = {
    status: 405,
    message: "Method Not Allowed",
  };

  public static InternalServerError = {
    status: 500,
    message: "Internal Server Error",
  };

  public static NotImplemented = {
    status: 501,
    message: "Not Implemented",
  };
}
