import { Request, Response } from "express";

export interface IRender {
  profile: IResponse;
  login: IResponse;
  register: IResponse;
}

export interface IResponse {
  (req: Request, res: Response): void;
}
