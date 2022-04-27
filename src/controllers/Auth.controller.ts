import { Router } from "express";
import AuthService from "../services/Auth.service";
import PassportController from "./Passport.controller";

class AuthController {
  private route = Router();
  private defaultURL = "/auth";
  private service = new AuthService();

  constructor() {
    this.put();
    this.patch();
    this.delete();
    this.post();
  }

  private post(): void {
    this.route.post(
      `${this.defaultURL}`,
      PassportController.signup,
      async (req, res) => {
        res.json({
          message: "SIGNUP",
        });
      }
    );
  }

  private put(): void {
    this.route.put(`${this.defaultURL}`, async (req, res) => {
      res.json({
        message: "PUT",
      });
    });
  }

  private patch(): void {
    this.route.patch(`${this.defaultURL}`, async (req, res) => {
      res.json({
        message: "PATCH",
      });
    });
  }

  private delete(): void {
    this.route.delete(`${this.defaultURL}`, async (req, res) => {
      res.json({
        message: "DELETE",
      });
    });
  }

  public getRouter(): Router {
    return this.route;
  }
}

export default new AuthController().getRouter();
