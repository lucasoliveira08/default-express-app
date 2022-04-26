import { Router } from "express";

class Auth {
  private route = Router();
  private defaultURL = "/auth";

  constructor() {
    this.get();
    this.post();
    this.put();
    this.patch();
    this.delete();
  }

  private get(): void {
    this.route.get(`${this.defaultURL}`, (req, res) => {
      res.json({
        message: "GET",
      });
    });
  }

  private post(): void {
    this.route.post(`${this.defaultURL}`, (req, res) => {
      console.log(req.body);
      res.json({
        body: req.body,
        message: "POST",
      });
    });
  }

  private put(): void {
    this.route.put(`${this.defaultURL}`, (req, res) => {
      res.json({
        message: "PUT",
      });
    });
  }

  private patch(): void {
    this.route.patch(`${this.defaultURL}`, (req, res) => {
      res.json({
        message: "PATCH",
      });
    });
  }

  private delete(): void {
    this.route.delete(`${this.defaultURL}`, (req, res) => {
      res.json({
        message: "DELETE",
      });
    });
  }

  public getRouter(): Router {
    return this.route;
  }
}

export default new Auth().getRouter();
