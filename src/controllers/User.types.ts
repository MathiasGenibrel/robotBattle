import { Request, Response } from "express";

export interface IRender {
  (req: Request, res: Response): void;
}

export interface IRegister {
  (req: Request, res: Response): void;
}

export interface ILogin {
  (req: Request, res: Response): void;
}
