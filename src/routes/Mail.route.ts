import { Router } from "express";
import MailController from "../controllers/Mail.controller";

class MailRoute {
  private route = Router();
  private defaultURL = "/mail";

  constructor() {
    this.post();
  }

  private post(): void {
    this.route.post(`${this.defaultURL}`, MailController.post);
  }

  public getRouter(): Router {
    return this.route;
  }
}

export default new MailRoute().getRouter();
