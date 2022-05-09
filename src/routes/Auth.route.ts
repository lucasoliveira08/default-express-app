import { Router } from "express";
import AuthController from "../controllers/Auth.controller";

class AuthRoute {
  private route = Router();
  private defaultURL = "/auth";

  constructor() {
    this.put();
    this.patch();
    this.delete();
    this.post();
  }

  private post(): void {
    this.route.post(`${this.defaultURL}`, AuthController.post);
  }

  private put(): void {
    this.route.put(`${this.defaultURL}`, AuthController.put);
  }

  private patch(): void {
    this.route.patch(`${this.defaultURL}`, AuthController.patch);
  }

  private delete(): void {
    this.route.delete(`${this.defaultURL}`, AuthController.delete);
  }

  public getRouter(): Router {
    return this.route;
  }
}

export default new AuthRoute().getRouter();
