import { Router } from "express";
import SessionController from "../controllers/Session.controller";

class SessionRouter {
  private route = Router();
  private defaultURL = "/session";

  constructor() {
    this.get();
    this.post();
  }

  private get(): void {
    this.route.get(`${this.defaultURL}`, SessionController.get);
  }

  private post(): void {
    this.route.post(`${this.defaultURL}`, SessionController.post);
  }

  public getRouter(): Router {
    return this.route;
  }
}

export default new SessionRouter().getRouter();
