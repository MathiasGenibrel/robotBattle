import { Request, Response } from "express";

// Import interfaces
type IRender = (req: Request, res: Response) => void;

class Robot {
  /**
   * According to the path, the user is redirected to the login page or the registration page.
   * @param req {Request} Express Request
   * @param res {Response} Express Response
   * @returns {void} Render the page
   */
  public render: IRender = (_req, res) => {
    const robots = this.getRobots();

    return res.render(`robots.ejs`, { robots });
  };

  private getRobots() {
    // TODO Connect to DB
    return [
      {
        name: "R2D2",
        username: "Anonymus",
      },
      {
        name: "C3PO",
        username: "Mithivi",
      },
    ];
  }
}

export default Robot;
