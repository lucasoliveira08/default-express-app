import { Request, Response, Router } from "express";
import AuthService from "../services/Auth.service";
import PassportController from "./Passport.controller";

class AuthController {
  service = new AuthService();

  public post(req: Request, res: Response, next): void {
    return PassportController.signup(req, res, next);
  }

  public put(req: Request, res: Response): void {
    res.json({
      message: "PUT",
    });
  }

  public patch(req: Request, res: Response): void {
    res.json({
      message: "PATCH",
    });
  }

  public delete(req: Request, res: Response): void {
    res.json({
      message: "DELETE",
    });
  }
}

export default new AuthController();
