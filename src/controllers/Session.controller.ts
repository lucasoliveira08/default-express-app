import { Router } from "express";
import AuthService from "../services/Auth.service";
import PassportController from "./Passport.controller";

class SessionController {
  private route = Router();
  private defaultURL = "/session";
  private service = new AuthService();

  constructor() {
    this.get();
    this.post();
  }

  private get(): void {
    this.route.get(`${this.defaultURL}`, async (req, res) => {
      res.json({
        message: "GET",
      });
    });
  }

  private post(): void {
    this.route.post(
      `${this.defaultURL}`,
      PassportController.signWithLocalStrategy
    );
  }

  public getRouter(): Router {
    return this.route;
  }
}

export default new SessionController().getRouter();
